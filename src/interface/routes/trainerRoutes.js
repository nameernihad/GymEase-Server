const express = require("express");
const {
  Login,
  getTrainerById,
  getSubscription,
  sentEmails,
  trainerEditProfile,
  totalSubAmount,
  durationCount,
  TokenCreation,
} = require("../controller/trainerController");
const { trainerAuthToken } = require("../middleware/authToken");
const { checkUserStatusByUserId } = require("../middleware/checkUserStatusById");
const { checkTrainerStatusByEmail } = require("../middleware/checkTrainerStatusByEmail");

const trainerRoutes = express.Router();

trainerRoutes.post("/",checkTrainerStatusByEmail, Login);
trainerRoutes.post("/sentEmail", sentEmails);
trainerRoutes.get("/ManagementTokenCreation",trainerAuthToken,checkUserStatusByUserId, TokenCreation);
trainerRoutes.put('/editProfile',trainerAuthToken,checkUserStatusByUserId,trainerEditProfile)

trainerRoutes.get("/getTrainer", trainerAuthToken,checkUserStatusByUserId, getTrainerById);
trainerRoutes.get("/getSubscription", trainerAuthToken,checkUserStatusByUserId, getSubscription);
trainerRoutes.get("/totalSubAmount", trainerAuthToken,checkUserStatusByUserId, totalSubAmount);
trainerRoutes.get("/durationCount", trainerAuthToken,checkUserStatusByUserId, durationCount);

module.exports = trainerRoutes;
