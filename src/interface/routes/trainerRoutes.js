const express = require("express");
const { Login } = require("../controller/trainerController");

const trainerRoutes = express.Router();

trainerRoutes.post("/", Login);

module.exports = trainerRoutes;
