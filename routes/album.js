let router = require("express").Router();
let AlbumController = require("../controller/Album.controller");
let upload = require("../config/multer");

router.post(
  "/album/create",
  upload.fields([
    { name: "title_img", maxCount: 1 },
    { name: "album_photos", maxCount: 10 },
  ]),
  AlbumController.Create
);
router.post("/album/update/:id", upload.any(), AlbumController.Update);
router.get("/album/delete/:id", AlbumController.DeleteById);
router.post("/album/delete_many", AlbumController.DeleteMultiple);
router.get("/album/read_all", AlbumController.ReadAll);
router.get("/album/read/:id", AlbumController.ReadById);
router.post(
  "/album/add/photo",
  upload.any(),
  AlbumController.AddPhotoToAlbum
);
router.post(
  "/album/remove/photo",
  AlbumController.RemoveAnImageFromAlbum
);

module.exports = router;
