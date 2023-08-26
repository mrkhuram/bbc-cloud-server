let router = require("express").Router();
let MusicController = require("../controller/Music.controller");
let upload = require("../config/multer");

router.post(
  "/music/create",
  upload.fields([{ name: "music_full_file", maxCount: 1 },{ name: "music_image", maxCount: 1 }]),
  MusicController.Create
);
router.post("/music/update/:id", upload.any(), MusicController.Update);
router.get("/music/delete/:id", MusicController.DeleteById);
router.post("/music/delete_many", MusicController.DeleteMultiple);
router.get("/music/read_all", MusicController.ReadAll);
router.get("/music/read/:id", MusicController.ReadById);
router.get("/music/buy/:id/:userID", MusicController.BuyMusic);

module.exports = router;
