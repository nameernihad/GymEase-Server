const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: { type: Array },
  Level: { type: String },
  gif: { type: String },
  count: { type: Number },
  timer: { type: Number },
  date: { type: Date },
});
const workoutModel = mongoose.model("Workout", workoutSchema);

module.exports = {
  workoutModel,
};
