const mongoose = require("mongoose");

const levelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  image: { type: String },
});
const levelModel = mongoose.model("Workoutlevel", levelSchema);

module.exports = {
  levelModel,
};
