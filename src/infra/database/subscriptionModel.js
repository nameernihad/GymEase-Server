const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TrainerDetails",
  },
  duration: {
    type: String,
    enum: ["oneMonth", "sixMonths", "oneYear"],
  },
  amount: {
    type: Number,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
});
const subscriptionModel = mongoose.model("subscription", subscriptionSchema);

module.exports = {
  subscriptionModel,
};
