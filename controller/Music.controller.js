const SplitAudio = require("../config/mp3Cutter");
let Music = require("../model/music");
let paypal = require("../config/paypal");

class MusicController {
  Create = async (req, res) => {
    try {
      let body = Object.assign({}, req.body);

      if (!body.title)
        return res.status(403).send({ message: "Title is required" });
      if (!body.releaseDate)
        return res.status(403).send({ message: "Date is required" });
      if (req.files.music_image.length < 0)
        return res.status(403).send({ message: "Image is required" });
      body.music_image = req.files.music_image[0].filename;
      if (req.files.music_full_file.length < 0)
        return res.status(403).send({ message: "Music file is required" });
      body.music_full_file = req.files.music_full_file[0].filename;

      let music_short_file = await SplitAudio(body.music_full_file);
      body.music_short_file = music_short_file;

      const newMusic = new Music({ ...body });

      let result = await newMusic.save();
      if (!result)
        return res
          .status(403)
          .send({ success: false, message: "Music saving failed." });

      return res.status(200).send({ success: true, Music: result });
    } catch (error) {}
    return res.status(401).send({
      success: false,
      message: "Something went wrong in Music creating",
    });
  };
  Update = async (req, res) => {
    try {
      let body = Object.assign({}, req.body);
      let Id = req.params.id;
      if (req.files.length > 0) {
        body.music_image = req.files[0].filename;
      }

      if (!Id) return res.status(403).send({ message: "ID param is required" });

      let result = await Music.findByIdAndUpdate(Id, body);
      if (!result)
        return res
          .status(403)
          .send({ success: false, message: "Music updating failed." });

      return res.status(200).send({ success: true, Music: result });
    } catch (error) {}
    return res.status(401).send({
      success: false,
      message: "Something went wrong in Music updating",
    });
  };
  DeleteById = async (req, res) => {
    try {
      let Id = req.params.id;

      if (!Id) return res.status(403).send({ message: "ID param is required" });

      let result = await Music.findByIdAndDelete(Id);
      if (!result)
        return res
          .status(403)
          .send({ success: false, message: "Music deleting failed." });

      return res.status(200).send({ success: true });
    } catch (error) {}
    return res.status(401).send({
      success: false,
      message: "Something went wrong in Music updating",
    });
  };
  DeleteMultiple = async (req, res) => {
    try {
      let body = Object.assign({}, req.body);

      if (!body.MusicIds)
        return res.status(403).send({ message: "ID is required" });

      for (let i = 0; i < body.MusicIds.length; i++) {
        const element = body.MusicIds[i];
        let result = await Music.findByIdAndDelete(element);
        console.log(result);
      }

      return res.status(200).send({ success: true });
    } catch (error) {}
    return res.status(401).send({
      success: false,
      message: "Something went wrong in Music updating",
    });
  };
  ReadById = async (req, res) => {
    try {
      let Id = req.params.id;

      if (!Id) return res.status(403).send({ message: "ID param is required" });

      let result = await Music.findById(Id);

      if (!result)
        return res
          .status(403)
          .send({ success: false, message: "Get One Music failed." });

      return res.status(200).send({ success: true, Music: result });
    } catch (error) {}
    return res.status(401).send({
      success: false,
      message: "Something went wrong in fetching Music.",
    });
  };
  ReadAll = async (req, res) => {
    try {
      let result = await Music.find();

      if (!result)
        return res
          .status(403)
          .send({ success: false, message: "Get Musics failed." });

      return res.status(200).send({ success: true, Music: result });
    } catch (error) {}
    return res.status(401).send({
      success: false,
      message: "Something went wrong in fetching Music.",
    });
  };
  BuyMusic = async (req, res) => {
    try {
      let musicId = req.params.id;

      let result = await Music.findById({ _id: musicId });

      const create_payment_json = {
        intent: "sale",
        payer: {
          payment_method: "paypal",
        },
        redirect_urls: {
          return_url: `http://16.171.254.234:5000/success_backend/${result._id}?price=${result.price}&music=yes&currency=USD&userID=${req.params.userID}`,
          cancel_url: "http://16.171.254.234:5000/cancel_backend/" + result._id,
        },
        transactions: [
          {
            item_list: {
              items: [
                {
                  name: result.title,
                  sku: "001",
                  price: result.price.toString(),
                  currency: "USD",
                  quantity: 1,
                },
              ],
            },
            amount: {
              currency: "USD",
              total: result.price.toString(),
            },
            description: "You are going to buy this song.",
          },
        ],
      };

      paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
          throw error;
        } else {
          for (let i = 0; i < payment.links.length; i++) {
            if (payment.links[i].rel === "approval_url") {
              res.redirect(payment.links[i].href);
            }
          }
        }
      });

      
    } catch (error) {
      return res.status(401).send({
        success: false,
        message: "Something went wrong in fetching Music.",
      });
    }
  };
}

module.exports = new MusicController();
