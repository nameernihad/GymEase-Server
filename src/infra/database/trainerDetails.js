const mongoose = require("mongoose");

const trainerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  about: {
    type: String,
  },
  experience: {
    years: {
      type: Number,
      default: 0,
    },
    months: {
      type: Number,
      default: 0,
    },
    days: {
      type: Number,
      default: 0,
    },
  },
  status: {
    type: String,
    default: "pending",
  },
  certifications: [{ type: String }],
  experienceDetails: {
    type: String,
  },
  profilePhoto: {
    type: String,
  },
  coverPhoto: {
    type: String,
  },
  paymentDetails: {
    oneMonth: {
      type: Number,
      default: 0,
    },
    sixMonths: {
      type: Number,
      default: 0,
    },
    oneYear: {
      type: Number,
      default: 0,
    },
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
});

const joinTrainerModal = mongoose.model("TrainerDetails", trainerSchema);

module.exports = joinTrainerModal;
