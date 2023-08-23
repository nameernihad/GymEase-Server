const express = require("express");
const {
  Login,
  UserListController,
  UserBlocking,
  TrainerlistController,
  UserSingleView,
} = require("../controller/adminController");

const {
  AddWorkout,
  WorkoutlistController,
  UpdateWorkout,
  WorkoutDelete,
} = require("../controller/workoutController");
const { adminAuthToken } = require("../middleware/authToken");
const fileUpload = require("../controller/fileUploadController");

const adminRoutes = express.Router();

adminRoutes.post("/", Login);
adminRoutes.post("/AddWorkout", AddWorkout);
adminRoutes.post("/uploadImage", (req, res) => {
  fileUpload(req.body.image)
    .then((url) => res.send(url))
    .catch((err) => res.status(500).send(err));
});

adminRoutes.get("/getAllUsers", adminAuthToken, UserListController);
adminRoutes.get("/getAllTrainer", adminAuthToken, TrainerlistController);
adminRoutes.get("/getAllWorkouts", adminAuthToken, WorkoutlistController);

adminRoutes.put("/blockuser/:userId", adminAuthToken, UserBlocking);
adminRoutes.put("/blocktrainer/:userId", adminAuthToken, UserBlocking);
adminRoutes.put("/updateWorkout/:workoutId", adminAuthToken, UpdateWorkout);
adminRoutes.delete("/deleteWorkout/:workoutId", adminAuthToken, WorkoutDelete);

adminRoutes.get("/showUser/:userId", adminAuthToken, UserSingleView);

module.exports = adminRoutes;
