const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  gif: { type: String, required: true },
  count: { type: Number },
  timer: { type: Number },
});
