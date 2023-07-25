let router = require("express").Router();
let MusicController = require("../controller/Music.controller");
let upload = require("../config/multer");

router.post("/music/create", upload.any(), MusicController.Create);
router.post("/music/update/:id",upload.any(), MusicController.Update);
router.get("/music/delete/:id", MusicController.DeleteById);
router.post("/music/delete_many", MusicController.DeleteMultiple);
router.get("/music/read_all", MusicController.ReadAll);
router.get("/music/read/:id", MusicController.ReadById);

module.exports = router;
