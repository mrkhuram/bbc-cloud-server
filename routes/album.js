let router = require("express").Router();
let AlbumController = require("../controller/Album.controller");
let upload = require("../config/multer");

router.post("/album/create", upload.any(), AlbumController.Create);
router.post("/album/update/:id",upload.any(), AlbumController.Update);
router.get("/album/delete/:id", AlbumController.DeleteById);
router.post("/album/delete_many", AlbumController.DeleteMultiple);
router.get("/album/read_all", AlbumController.ReadAll);
router.get("/album/read/:id", AlbumController.ReadById);

module.exports = router;
