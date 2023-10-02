const express = require("express");
const {
  Login,
  getTrainerById,
  getSubscription,
  sentEmails,
} = require("../controller/trainerController");
const { trainerAuthToken } = require("../middleware/authToken");

const trainerRoutes = express.Router();

trainerRoutes.post("/", Login);
trainerRoutes.get("/getTrainer", trainerAuthToken, getTrainerById);
trainerRoutes.get("/getSubscription", trainerAuthToken, getSubscription);
trainerRoutes.post("/sentEmail", sentEmails);

module.exports = trainerRoutes;
