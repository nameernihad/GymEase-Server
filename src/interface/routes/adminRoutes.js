const express = require("express");
const {
  Login,
  UserListController,
  UserBlocking,
  TrainerlistController,
  UserSingleView,
  trainerRequest,
  requestValidtion,
  totalPayments,
  subscriptionList,
} = require("../controller/adminController");

const {
  AddWorkout,
  WorkoutlistController,
  UpdateWorkout,
  WorkoutDelete,
  filterWorkout,
} = require("../controller/workoutController");
const { adminAuthToken } = require("../middleware/authToken");
const fileUpload = require("../controller/fileUploadController");
const {
  addLevel,
  updateLevel,
  updatelevel,
  levelList,
  levelDelete,
  getLevelById,
} = require("../controller/levelController");
const {
  addCategory,
  updateCategory,
  Categorylist,
  categoryDelete,
  getCategoryById,
} = require("../controller/categoryController");

const adminRoutes = express.Router();

adminRoutes.post("/", Login);
adminRoutes.post("/AddWorkout", AddWorkout);
adminRoutes.post("/addLevel", addLevel);
adminRoutes.post("/addCategory", addCategory);
adminRoutes.post("/uploadImage", (req, res) => {
  fileUpload(req.body.image)
    .then((url) => res.send(url))
    .catch((err) => res.status(500).send(err));
});

adminRoutes.get("/getAllUsers", adminAuthToken, UserListController);
adminRoutes.get("/getAllTrainer", adminAuthToken, TrainerlistController);
adminRoutes.get("/getAllWorkouts", adminAuthToken, WorkoutlistController);
adminRoutes.get("/getAllLevel", adminAuthToken, levelList);
adminRoutes.get("/getAllCategory", adminAuthToken, Categorylist);
adminRoutes.get("/getAllSubscriptions", adminAuthToken, subscriptionList);
adminRoutes.get("/getLevelById/:levelId", adminAuthToken, getLevelById);
adminRoutes.get("/showUser", adminAuthToken, UserSingleView);
adminRoutes.get("/trainerRequest",adminAuthToken, trainerRequest);
adminRoutes.get("/totalPayments",adminAuthToken, totalPayments);

adminRoutes.get(
  "/getCategoryById/:categoryId",
  adminAuthToken,
  getCategoryById
);


adminRoutes.put("/blockuser/:userId", adminAuthToken, UserBlocking);
adminRoutes.put("/blocktrainer/:userId", adminAuthToken, UserBlocking);
adminRoutes.put("/updateWorkout/:workoutId", adminAuthToken, UpdateWorkout);
adminRoutes.put("/updateLevel/:levelId", adminAuthToken, updatelevel);
adminRoutes.put("/updateCategory/:categoryId", adminAuthToken, updateCategory);

adminRoutes.delete("/deleteWorkout/:workoutId", adminAuthToken, WorkoutDelete);
adminRoutes.delete("/deleteLevel/:levelId", adminAuthToken, levelDelete);
adminRoutes.delete(
  "/categoryDelete/:categoryId",
  adminAuthToken,
  categoryDelete
);

adminRoutes.patch("/requestValidation/:id", adminAuthToken, requestValidtion);

module.exports = adminRoutes;
