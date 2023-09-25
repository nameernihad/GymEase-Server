const express = require("express");
const { Login, getTrainerById } = require("../controller/trainerController");
const { trainerAuthToken } = require("../middleware/authToken");

const trainerRoutes = express.Router();

trainerRoutes.post("/", Login);
trainerRoutes.get("/getTrainer", trainerAuthToken, getTrainerById);

module.exports = trainerRoutes;
