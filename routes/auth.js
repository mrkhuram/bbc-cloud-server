let router = require("express").Router();
let AuthController = require("../controller/Auth");

router.post("/register", AuthController.Register);
router.post("/login", AuthController.Login);

module.exports = router; 
