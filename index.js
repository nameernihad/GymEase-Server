const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const userController = require("./src/interface/controller/userController");
const router = require("./src/interface/routes/userRoutes");
const adminRoutes = require("./src/interface/routes/adminRoutes");
const trainerRoutes = require("./src/interface/routes/trainerRoutes");

require("dotenv").config();

const app = express();

app.use(cors({
  origin: ['https://gymease.vercel.app','http://localhost:3000'],
}));


app.use(morgan("dev"));

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.use("/", router);
app.use("/admin", adminRoutes);
app.use("/trainer", trainerRoutes);

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

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
