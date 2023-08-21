let Store = require("../model/store");

class StoreController {
  Create = async (req, res) => {
    try {
      let body = Object.assign({}, req.body);

      if (!body.title)
        return res.status(403).send({ message: "Title is required" });
      if (!body.description)
        return res.status(403).send({ message: "Description is required" });
      if (!body.quantity)
        return res.status(403).send({ message: "Quantity is required" });
      if (!body.price)
        return res.status(403).send({ message: "Price is required" });
      if (req.files.length < 0)
        return res.status(403).send({ message: "Image is required" });
      body.product_image = req.files[0].filename;

      const newStore = new Store({ ...body });

      let result = await newStore.save();
      if (!result)
        return res
          .status(403)
          .send({ success: false, message: "Product saving failed." });

      return res.status(200).send({ success: true, Product: result });
    } catch (error) {}
    return res.status(401).send({
      success: false,
      message: "Something went wrong in Product creating",
    });
  };
  Update = async (req, res) => {
    try {
      let body = Object.assign({}, req.body);
      let Id = req.params.id;
      if (req.files.length > 0) {
        body.product_image = req.files[0].filename;
      }

      if (!Id) return res.status(403).send({ message: "ID param is required" });

      let result = await Store.findByIdAndUpdate(Id, body);
      if (!result)
        return res
          .status(403)
          .send({ success: false, message: "Product updating failed." });

      return res.status(200).send({ success: true, Product: result });
    } catch (error) {}
    return res.status(401).send({
      success: false,
      message: "Something went wrong in Product updating",
    });
  };
  DeleteById = async (req, res) => {
    try {
      let Id = req.params.id;

      if (!Id) return res.status(403).send({ message: "ID param is required" });

      let result = await Store.findByIdAndDelete(Id);
      if (!result)
        return res
          .status(403)
          .send({ success: false, message: "Product deleting failed." });

      return res.status(200).send({ success: true });
    } catch (error) {}
    return res.status(401).send({
      success: false,
      message: "Something went wrong in Product updating",
    });
  };
  DeleteMultiple = async (req, res) => {
    try {
      let body = Object.assign({}, req.body);

      if (!body.productIds)
        return res.status(403).send({ message: "ID is required" });

      for (let i = 0; i < body.productIds.length; i++) {
        const element = body.productIds[i];
        let result = await Store.findByIdAndDelete(element);
        console.log(result);
      }

      return res.status(200).send({ success: true });
    } catch (error) {}
    return res.status(401).send({
      success: false,
      message: "Something went wrong in Product updating",
    });
  };
  ReadById = async (req, res) => {
    try {
      let Id = req.params.id;

      if (!Id) return res.status(403).send({ message: "ID param is required" });

      let result = await Store.findById(Id);

      if (!result)
        return res
          .status(403)
          .send({ success: false, message: "Get One Product failed." });

      return res.status(200).send({ success: true, Product: result });
    } catch (error) {}
    return res.status(401).send({
      success: false,
      message: "Something went wrong in fetching Product.",
    });
  };
  ReadAll = async (req, res) => {
    try {
      let result = await Store.find();

      if (!result)
        return res
          .status(403)
          .send({ success: false, message: "Getting Products failed." });

      return res.status(200).send({ success: true, Product: result });
    } catch (error) {}
    return res.status(401).send({
      success: false,
      message: "Something went wrong in fetching Product.",
    });
  };
}

module.exports = new StoreController();
