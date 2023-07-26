const express = require("express");
const { Login } = require("../controller/adminController");

const adminRoutes = express.Router();

adminRoutes.post("/", Login);

module.exports = adminRoutes;
