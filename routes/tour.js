let router = require("express").Router();
let TourController = require("../controller/Tour.controller");

router.post("/tour/create", TourController.Create);
router.post("/tour/update/:id", TourController.Update);
router.get("/tour/delete/:id", TourController.DeleteById);
router.post("/tour/delete_many", TourController.DeleteMultiple);
router.get("/tour/read_all", TourController.ReadAll);
router.get("/tour/read/:id", TourController.ReadById);

module.exports = router; 