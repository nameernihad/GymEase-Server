const express = require("express");
const {
  Login,
  getTrainerById,
  getSubscription,
  sentEmails,
} = require("../controller/trainerController");
const { trainerAuthToken } = require("../middleware/authToken");
const { checkUserStatusByEmail } = require("../middleware/checkUserStatusByEmail");
const { checkUserStatusByUserId } = require("../middleware/checkUserStatusById");
const { checkTrainerStatusByEmail } = require("../middleware/checkTrainerStatusByEmail");

const trainerRoutes = express.Router();

trainerRoutes.post("/",checkTrainerStatusByEmail, Login);
trainerRoutes.get("/getTrainer", trainerAuthToken,checkUserStatusByUserId, getTrainerById);
trainerRoutes.get("/getSubscription", trainerAuthToken,checkUserStatusByUserId, getSubscription);
trainerRoutes.post("/sentEmail", sentEmails);

module.exports = trainerRoutes;
