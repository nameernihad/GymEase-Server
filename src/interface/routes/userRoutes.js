const express = require("express");
const userController = require("../controller/userController");
const sentEmail = require("../controller/sentEmail");
const { userAuthToken } = require("../middleware/authToken");

const router = express.Router();

router.post("/register", userController.UserRegister);
router.post("/joinAsTrainer", userAuthToken, userController.joinAsTrainer);
router.post("/login", userController.UserLogin);
router.post(
  "/loginWithGoogle",

  userController.userLoginWithGoogle
);
router.post("/sentMail/", sentEmail.sentEmial);

router.put("/updateUser/:userId", userAuthToken, userController.updateUser);

router.patch("/resetPass/:userId", userAuthToken, sentEmail.PasswordReset);

router.get("/singView", userAuthToken, userController.singleView);
router.get("/getAllTrainer", userAuthToken, userController.getTrainers);

module.exports = router;
