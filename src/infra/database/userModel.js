const mongoose = require("mongoose");
const { User } = require("../../domain/model/user");

//  User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String },
  phone: { type: Number },
  isTrainer: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  isBlock: { type: Boolean, default: false },
});

// create userModel from the schema
const UserModel = mongoose.model("User", userSchema);

module.exports = {
  UserModel,
};
