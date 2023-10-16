const express = require("express");
const userController = require("../controller/userController");
const sentEmail = require("../controller/sentEmail");
const { userAuthToken } = require("../middleware/authToken");
const { levelList } = require("../controller/levelController");
const { Categorylist } = require("../controller/categoryController");
const { filterWorkout } = require("../controller/workoutController");
const { checkUserStatusByEmail } = require("../middleware/checkUserStatusByEmail");
const { checkUserStatusByUserId } = require("../middleware/checkUserStatusById");
const fileUploadController = require("../controller/fileUploadController");

const router = express.Router();

router.post("/register", userController.UserRegister);
router.post("/joinAsTrainer",  userAuthToken,checkUserStatusByUserId, userController.joinAsTrainer);
router.post("/login", checkUserStatusByEmail, userController.UserLogin);
router.post(
  "/loginWithGoogle",
  userController.userLoginWithGoogle
);
router.post("/sentMail/", sentEmail.sentEmial);
router.post(
  "/subscription/:trainerId",
  userAuthToken,checkUserStatusByUserId,
  userController.subscriptionController
);
router.post("/uploadImage", (req, res) => {
  fileUploadController(req.body.image)
    .then((url) => res.send(url))
    .catch((err) => res.status(500).send(err));
});

router.get("/singView",  userAuthToken,checkUserStatusByUserId, userController.singleView);
router.get("/getAllTrainer",  userAuthToken,checkUserStatusByUserId, userController.getTrainers);
router.get("/getTrainerById/:Id",  userController.getTrainerById);
router.get("/getAllLevel",  userAuthToken,checkUserStatusByUserId, levelList);
router.get("/getAllCategory",  userAuthToken,checkUserStatusByUserId, Categorylist);
router.get(
  "/filteredWorkout/:levelId/:categoryId", 
  userAuthToken,checkUserStatusByUserId,
  filterWorkout
);

router.patch("/resetPass/:userId",  userAuthToken,checkUserStatusByUserId, sentEmail.PasswordReset);
router.patch(
  "/addRating/:trainerId", 
  userAuthToken,checkUserStatusByUserId,
  userController.addRating
);
router.post("/userUpdate",  userAuthToken,checkUserStatusByUserId, userController.updateUser);

module.exports = router;
