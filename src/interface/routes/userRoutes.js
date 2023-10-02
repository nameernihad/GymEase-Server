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
router.post(
  "/subscription/:trainerId",
  userAuthToken,
  userController.subscriptionController
);

router.get("/singView", userAuthToken, userController.singleView);
router.get("/getAllTrainer", userAuthToken, userController.getTrainers);
router.get("/getTrainerById/:Id", userController.getTrainerById);

router.put("/updateUser/:userId", userAuthToken, userController.updateUser);

router.patch("/resetPass/:userId", userAuthToken, sentEmail.PasswordReset);
router.patch(
  "/addRating/:trainerId",
  userAuthToken,
  userController.addRating
);

module.exports = router;
