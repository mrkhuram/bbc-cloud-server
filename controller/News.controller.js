let News = require("../model/news");

class NewsController {
  Create = async (req, res) => {
    try {
      let body = Object.assign({}, req.body);

      if (!body.title)
        return res.status(403).send({ message: "Title is required" });
      if (!body.description)
        return res.status(403).send({ message: "Description is required" });
      if (!body.date)
        return res.status(403).send({ message: "Date is required" });
      if (req.files.length < 0)
        return res.status(403).send({ message: "Image is required" });
      body.image = req.files[0].filename;

      const newNews = new News({ ...body });

      let result = await newNews.save();
      if (!result)
        return res
          .status(403)
          .send({ success: false, message: "News saving failed." });

      return res.status(200).send({ success: true, News: result });
    } catch (error) {}
    return res.status(401).send({
      success: false,
      message: "Something went wrong in News creating",
    });
  };
  Update = async (req, res) => {
    try {
      let body = Object.assign({}, req.body);
      let Id = req.params.id;
      if (req.files.length > 0) {
        body.image = req.files[0].filename;
      }

      if (!Id) return res.status(403).send({ message: "ID param is required" });

      let result = await News.findByIdAndUpdate(Id, body);
      if (!result)
        return res
          .status(403)
          .send({ success: false, message: "News updating failed." });

      return res.status(200).send({ success: true, News: result });
    } catch (error) {}
    return res.status(401).send({
      success: false,
      message: "Something went wrong in News updating",
    });
  };
  DeleteById = async (req, res) => {
    try {
      let Id = req.params.id;

      if (!Id) return res.status(403).send({ message: "ID param is required" });

      let result = await News.findByIdAndDelete(Id);
      if (!result)
        return res
          .status(403)
          .send({ success: false, message: "News deleting failed." });

      return res.status(200).send({ success: true });
    } catch (error) {}
    return res.status(401).send({
      success: false,
      message: "Something went wrong in News updating",
    });
  };
  DeleteMultiple = async (req, res) => {
    try {
      let body = Object.assign({}, req.body);

      if (!body.NewsIds)
        return res.status(403).send({ message: "ID is required" });

      for (let i = 0; i < body.NewsIds.length; i++) {
        const element = body.NewsIds[i];
        let result = await News.findByIdAndDelete(element);
        console.log(result);
      }

      return res.status(200).send({ success: true });
    } catch (error) {}
    return res.status(401).send({
      success: false,
      message: "Something went wrong in News updating",
    });
  };
  ReadById = async (req, res) => {
    try {
      let Id = req.params.id;

      if (!Id) return res.status(403).send({ message: "ID param is required" });

      let result = await News.findById(Id);

      if (!result)
        return res
          .status(403)
          .send({ success: false, message: "Get One News failed." });

      return res.status(200).send({ success: true, News: result });
    } catch (error) {}
    return res.status(401).send({
      success: false,
      message: "Something went wrong in fetching News.",
    });
  };
  ReadAll = async (req, res) => {
    try {
      let result = await News.find();

      if (!result)
        return res
          .status(403)
          .send({ success: false, message: "Get Newss failed." });

      return res.status(200).send({ success: true, News: result });
    } catch (error) {}
    return res.status(401).send({
      success: false,
      message: "Something went wrong in fetching News.",
    });
  };
}

module.exports = new NewsController();
