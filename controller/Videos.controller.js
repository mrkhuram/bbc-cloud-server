let Videos = require("../model/videos");

class VideosController {
  Create = async (req, res) => {
    try {
      let body = Object.assign({}, req.body);

      if (!body.title)
        return res.status(403).send({ message: "Title is required" });
      if (!body.video_link)
        return res.status(403).send({ message: "Date is required" });
      if (req.files.length < 0)
        return res.status(403).send({ message: "Image is required" });
      body.video_image = req.files[0].filename;

      const newVideos = new Videos({ ...body });

      let result = await newVideos.save();
      if (!result)
        return res
          .status(403)
          .send({ success: false, message: "Videos saving failed." });

      return res.status(200).send({ success: true, Videos: result });
    } catch (error) {}
    return res.status(401).send({
      success: false,
      message: "Something went wrong in Videos creating",
    });
  };
  Update = async (req, res) => {
    try {
      let body = Object.assign({}, req.body);
      let Id = req.params.id;
      if (req.files.length > 0) {
        body.video_image = req.files[0].filename;
      }

      if (!Id) return res.status(403).send({ message: "ID param is required" });

      let result = await Videos.findByIdAndUpdate(Id, body);
      if (!result)
        return res
          .status(403)
          .send({ success: false, message: "Videos updating failed." });

      return res.status(200).send({ success: true, Videos: result });
    } catch (error) {}
    return res.status(401).send({
      success: false,
      message: "Something went wrong in Videos updating",
    });
  };
  DeleteById = async (req, res) => {
    try {
      let Id = req.params.id;

      if (!Id) return res.status(403).send({ message: "ID param is required" });

      let result = await Videos.findByIdAndDelete(Id);
      if (!result)
        return res
          .status(403)
          .send({ success: false, message: "Videos deleting failed." });

      return res.status(200).send({ success: true });
    } catch (error) {}
    return res.status(401).send({
      success: false,
      message: "Something went wrong in Videos updating",
    });
  };
  DeleteMultiple = async (req, res) => {
    try {
      let body = Object.assign({}, req.body);

      if (!body.VideosIds)
        return res.status(403).send({ message: "ID is required" });

      for (let i = 0; i < body.VideosIds.length; i++) {
        const element = body.VideosIds[i];
        let result = await Videos.findByIdAndDelete(element);
        console.log(result);
      }

      return res.status(200).send({ success: true });
    } catch (error) {}
    return res.status(401).send({
      success: false,
      message: "Something went wrong in Videos updating",
    });
  };
  ReadById = async (req, res) => {
    try {
      let Id = req.params.id;

      if (!Id) return res.status(403).send({ message: "ID param is required" });

      let result = await Videos.findById(Id);

      if (!result)
        return res
          .status(403)
          .send({ success: false, message: "Get One Videos failed." });

      return res.status(200).send({ success: true, Videos: result });
    } catch (error) {}
    return res.status(401).send({
      success: false,
      message: "Something went wrong in fetching Videos.",
    });
  };
  ReadAll = async (req, res) => {
    try {
      let result = await Videos.find();

      if (!result)
        return res
          .status(403)
          .send({ success: false, message: "Get Videoss failed." });

      return res.status(200).send({ success: true, Videos: result });
    } catch (error) {}
    return res.status(401).send({
      success: false,
      message: "Something went wrong in fetching Videos.",
    });
  };
}

module.exports = new VideosController();
