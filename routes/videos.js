let router = require("express").Router();
let VideosController = require("../controller/Videos.controller");
let upload = require("../config/multer");

router.post("/videos/create", upload.any(), VideosController.Create);
router.post("/videos/update/:id",upload.any(), VideosController.Update);
router.get("/videos/delete/:id", VideosController.DeleteById);
router.post("/videos/delete_many", VideosController.DeleteMultiple);
router.get("/videos/read_all", VideosController.ReadAll);
router.get("/videos/read/:id", VideosController.ReadById);

module.exports = router;
