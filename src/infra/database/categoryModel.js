const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  image: { type: String },
});
const categoryModel = mongoose.model("categorylevel", categorySchema);

module.exports = {
  categoryModel,
};
