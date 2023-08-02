const express = require("express");
const {
  Login,
  UserListController,
  UserBlocking,
  TrainerlistController,
  UserSingleView,
} = require("../controller/adminController");

const adminRoutes = express.Router();

adminRoutes.post("/", Login);
adminRoutes.get("/getAllUsers", UserListController);
adminRoutes.get("/getAllTrainer", TrainerlistController);
adminRoutes.put("/blockuser/:userId", UserBlocking);
adminRoutes.put("/blocktrainer/:userId", UserBlocking);
adminRoutes.get("/showUser/:userId", UserSingleView);

module.exports = adminRoutes;
