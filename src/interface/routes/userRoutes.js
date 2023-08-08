const express = require("express");
const userController = require("../controller/userController");
const sentEmail = require("../controller/sentEmail");

const router = express.Router();

router.post("/register", userController.UserRegister);
router.post("/login", userController.UserLogin);
router.post("/loginWithGoogle", userController.userLoginWithGoogle);
router.post("/sentMail/", sentEmail.sentEmial);
router.patch("/restPass/:userId", sentEmail.PasswordReset);

module.exports = router;
