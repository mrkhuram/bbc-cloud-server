let Album = require("../model/album");

class AlbumController {
  Create = async (req, res) => {
    try {
      let body = Object.assign({}, req.body);

      if (!body.title)
        return res.status(403).send({ message: "Title is required" });
      if (req.files.title_img.length < 0)
        return res.status(403).send({ message: "Image is required" });
      body.title_img = req.files.title_img[0].filename;
      if (req.files.album_photos.length < 0)
        return res.status(403).send({ message: "Album photos are required" });
      let arr = [];
      req.files.album_photos.forEach((element) => {
        arr.push({ album_image: element.filename });
      });
      body.album_photos = arr;

      const newAlbum = new Album({ ...body });

      let result = await newAlbum.save();
      if (!result)
        return res
          .status(403)
          .send({ success: false, message: "Album saving failed." });

      return res.status(200).send({ success: true, Album: result });
    } catch (error) {}
    return res.status(401).send({
      success: false,
      message: "Something went wrong in Album creating",
    });
  };
  AddPhotoToAlbum = async (req, res) => {
    try {
      let body = Object.assign({}, req.body);

      if (!body.albumId)
        return res.status(403).send({ message: "Album Id is required" });
      if (req.files.length < 0)
        return res.status(403).send({ message: "Album photos are required" });
      let file = { album_image: req.files[0].filename };
      const album = await Album.findByIdAndUpdate(
        { _id: body.albumId },
        { $push: { album_photos: file } }
      );
      if (!album)
        return res
          .status(403)
          .send({ success: false, message: "Album saving failed." });

      return res.status(200).send({ success: true, Album: album });
    } catch (error) {}
    return res.status(401).send({
      success: false,
      message: "Something went wrong in Album creating",
    });
  };
  RemoveAnImageFromAlbum = async (req, res) => {
    try {
      let body = Object.assign({}, req.body);

      if (!body.albumId)
        return res.status(403).send({ message: "Album Id is required" });
      if (!body.image_id)
        return res.status(403).send({ message: "Image id are required" });

      let album = await Album.findOneAndUpdate(
        { _id: body.albumId },
        { $pull: { album_photos: { _id: body.image_id } } },
        { safe: true, multi: true }
      );
      if (!album)
        return res
          .status(403)
          .send({ success: false, message: "Album saving failed." });

      return res.status(200).send({ success: true, Album: album });
    } catch (error) {
      console.log(error)
      return res.status(401).send({
        success: false,
        message: "Something went wrong in Album creating",
      });
    }
  };
  Update = async (req, res) => {
    try {
      let body = Object.assign({}, req.body);
      let Id = req.params.id;
      if (req.files.length > 0) {
        body.Album_image = req.files[0].filename;
      }

      if (!Id) return res.status(403).send({ message: "ID param is required" });

      let result = await Album.findByIdAndUpdate(Id, body);
      if (!result)
        return res
          .status(403)
          .send({ success: false, message: "Album updating failed." });

      return res.status(200).send({ success: true, Album: result });
    } catch (error) {}
    return res.status(401).send({
      success: false,
      message: "Something went wrong in Album updating",
    });
  };
  DeleteById = async (req, res) => {
    try {
      let Id = req.params.id;

      if (!Id) return res.status(403).send({ message: "ID param is required" });

      let result = await Album.findByIdAndDelete(Id);
      if (!result)
        return res
          .status(403)
          .send({ success: false, message: "Album deleting failed." });

      return res.status(200).send({ success: true });
    } catch (error) {}
    return res.status(401).send({
      success: false,
      message: "Something went wrong in Album updating",
    });
  };
  DeleteMultiple = async (req, res) => {
    try {
      let body = Object.assign({}, req.body);

      if (!body.AlbumIds)
        return res.status(403).send({ message: "ID is required" });

      for (let i = 0; i < body.AlbumIds.length; i++) {
        const element = body.AlbumIds[i];
        let result = await Album.findByIdAndDelete(element);
        console.log(result);
      }

      return res.status(200).send({ success: true });
    } catch (error) {}
    return res.status(401).send({
      success: false,
      message: "Something went wrong in Album updating",
    });
  };
  ReadById = async (req, res) => {
    try {
      let Id = req.params.id;

      if (!Id) return res.status(403).send({ message: "ID param is required" });

      let result = await Album.findById(Id);

      if (!result)
        return res
          .status(403)
          .send({ success: false, message: "Get One Album failed." });

      return res.status(200).send({ success: true, Album: result });
    } catch (error) {}
    return res.status(401).send({
      success: false,
      message: "Something went wrong in fetching Album.",
    });
  };
  ReadAll = async (req, res) => {
    try {
      let result = await Album.find();

      if (!result)
        return res
          .status(403)
          .send({ success: false, message: "Get Albums failed." });

      return res.status(200).send({ success: true, Album: result });
    } catch (error) {}
    return res.status(401).send({
      success: false,
      message: "Something went wrong in fetching Album.",
    });
  };
}

module.exports = new AlbumController();
