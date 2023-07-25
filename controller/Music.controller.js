let Music = require("../model/music");

class MusicController {
  Create = async (req, res) => {
    try {
      let body = Object.assign({}, req.body);

      if (!body.title)
        return res.status(403).send({ message: "Title is required" });
      if (!body.releaseDate)
        return res.status(403).send({ message: "Date is required" });
      if (!body.music_link)
        return res.status(403).send({ message: "Music URL is required" });
      if (req.files.length < 0)
        return res.status(403).send({ message: "Image is required" });
      body.music_image = req.files[0].filename;

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
}

module.exports = new MusicController();
