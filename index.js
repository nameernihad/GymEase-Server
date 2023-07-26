const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const userController = require("./src/interface/controller/userController");
const router = require("./src/interface/routes/userRoutes");
const adminRoutes = require("./src/interface/routes/adminRoutes");

require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use("/", router);
app.use("/admin", adminRoutes);

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

app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
