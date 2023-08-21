let router = require("express").Router();
let StoreController = require("../controller/Store.controller");
let upload = require("../config/multer");

router.post("/store/create/product", upload.any(), StoreController.Create);
router.post("/store/update/product/:id",upload.any(), StoreController.Update);
router.get("/store/delete/product/:id", StoreController.DeleteById);
router.post("/store/delete_many/products", StoreController.DeleteMultiple);
router.get("/store/read_all/products", StoreController.ReadAll);
router.get("/store/read/product/:id", StoreController.ReadById);


module.exports = router;
