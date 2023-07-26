const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const userController = require("./src/interface/controller/userController");
const router = require("./src/interface/routes/userRoutes");

// Load environment variables from .env file (optional)
require("dotenv").config();

// Create Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use("/", router); // Mount the router at the "/api" base path

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("Error connecting to MongoDB:", err);
});

// Define a sample route
app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
