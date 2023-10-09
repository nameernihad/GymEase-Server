const express = require("express");
const userController = require("../controller/userController");
const sentEmail = require("../controller/sentEmail");
const { userAuthToken } = require("../middleware/authToken");
const { levelList } = require("../controller/levelController");
const { Categorylist } = require("../controller/categoryController");
const { filterWorkout } = require("../controller/workoutController");

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
router.get("/getAllLevel",userAuthToken, levelList);
router.get("/getAllCategory", userAuthToken, Categorylist);
router.put("/updateUser/:userId", userAuthToken, userController.updateUser);
router.get(
  "/filteredWorkout/:levelId/:categoryId",
  userAuthToken,
  filterWorkout
);

router.patch("/resetPass/:userId", userAuthToken, sentEmail.PasswordReset);
router.patch(
  "/addRating/:trainerId",
  userAuthToken,
  userController.addRating
);

module.exports = router;
