const express = require("express");
const userController = require("../controller/userController");

const router = express.Router();

router.post("/register", userController.UserRegister);
router.post("/login", userController.UserLogin);
router.post("/loginWithGoogle", userController.userLoginWithGoogle);

module.exports = router;
