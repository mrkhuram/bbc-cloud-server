let Tour = require("../model/tour");


class TourController {
  Create = async (req, res) => {
    try {
      let body = Object.assign({}, req.body);

      if (!body.title)
        return res.status(403).send({ message: "Title is required" });
      if (!body.city)
        return res.status(403).send({ message: "City is required" });
      if (!body.state)
        return res.status(403).send({ message: "State is required" });
      if (!body.ticket_link)
        return res.status(403).send({ message: "Ticket link is required" });
      if (!body.date)
        return res.status(403).send({ message: "Date link is required" });

      const newTour = new Tour({ ...body });

      let result = await newTour.save();
      if (!result)
        return res
          .status(403)
          .send({ success: false, message: "Tour saving failed." });

      return res.status(200).send({ success: true, Tour: result });
    } catch (error) {}
    return res.status(401).send({
      success: false,
      message: "Something went wrong in Tour creating",
    });
  };
  Update = async (req, res) => {
    try {
      let body = Object.assign({}, req.body);
      let Id = req.params.id;

      if (!Id) return res.status(403).send({ message: "ID param is required" });

      let result = await Tour.findByIdAndUpdate(Id, body);
      if (!result)
        return res
          .status(403)
          .send({ success: false, message: "Tour updating failed." });

      return res.status(200).send({ success: true, Tour: result });
    } catch (error) {}
    return res.status(401).send({
      success: false,
      message: "Something went wrong in Tour updating",
    });
  };
  DeleteById = async (req, res) => {
    try {
      let Id = req.params.id;

      if (!Id) return res.status(403).send({ message: "ID param is required" });

      let result = await Tour.findByIdAndDelete(Id);
      if (!result)
        return res
          .status(403)
          .send({ success: false, message: "Tour deleting failed." });

      return res.status(200).send({ success: true });
    } catch (error) {}
    return res.status(401).send({
      success: false,
      message: "Something went wrong in Tour updating",
    });
  };
  DeleteMultiple = async (req, res) => {
    try {
      let body = Object.assign({}, req.body);

      if (!body.tourIds)
        return res.status(403).send({ message: "ID is required" });

      for (let i = 0; i < body.tourIds.length; i++) {
        const element = body.tourIds[i];
        let result = await Tour.findByIdAndDelete(element);
        console.log(result);
      }

      return res.status(200).send({ success: true });
    } catch (error) {}
    return res.status(401).send({
      success: false,
      message: "Something went wrong in Tour updating",
    });
  };
  ReadById = async (req, res) => {
    try {
      let Id = req.params.id;

      if (!Id) return res.status(403).send({ message: "ID param is required" });

      let result = await Tour.findById(Id);

      if (!result)
        return res
          .status(403)
          .send({ success: false, message: "Get One Tour failed." });

      return res.status(200).send({ success: true, Tour: result });
    } catch (error) {}
    return res.status(401).send({
      success: false,
      message: "Something went wrong in fetching tour.",
    });
  };
  ReadAll = async (req, res) => {
    try {
      let result = await Tour.find();

      if (!result)
        return res
          .status(403)
          .send({ success: false, message: "Get Tours failed." });

      return res.status(200).send({ success: true, Tour: result });
    } catch (error) {}
    return res.status(401).send({
      success: false,
      message: "Something went wrong in fetching tour.",
    });
  };
}

module.exports = new TourController();
