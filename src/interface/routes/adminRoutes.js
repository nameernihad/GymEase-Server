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
} = require("../controller/workoutController");

const adminRoutes = express.Router();

adminRoutes.post("/", Login);
adminRoutes.post("/AddWorkout", AddWorkout);

adminRoutes.get("/getAllUsers", UserListController);
adminRoutes.get("/getAllTrainer", TrainerlistController);
adminRoutes.get("/getAllWorkouts", WorkoutlistController);

adminRoutes.put("/blockuser/:userId", UserBlocking);
adminRoutes.put("/blocktrainer/:userId", UserBlocking);
adminRoutes.put("/updateWorkout/:workoutId", UpdateWorkout);

adminRoutes.get("/showUser/:userId", UserSingleView);

module.exports = adminRoutes;
