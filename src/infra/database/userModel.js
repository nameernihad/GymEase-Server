const mongoose = require("mongoose");
const { User } = require("../../domain/model/user");

//  User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: Number, require: true },
  isTrainer: { type: String, default: false },
  isAdmin: { type: String, default: false },
});

// create userModel from the schema
const UserModel = mongoose.model("User", userSchema);

module.exports = {
  UserModel,
};
