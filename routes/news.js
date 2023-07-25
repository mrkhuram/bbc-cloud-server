let router = require("express").Router();
let NewsController = require("../controller/News.controller");
let upload = require("../config/multer");

router.post("/news/create", upload.any(), NewsController.Create);
router.post("/news/update/:id",upload.any(), NewsController.Update);
router.get("/news/delete/:id", NewsController.DeleteById);
router.post("/news/delete_many", NewsController.DeleteMultiple);
router.get("/news/read_all", NewsController.ReadAll);
router.get("/news/read/:id", NewsController.ReadById);

module.exports = router;
