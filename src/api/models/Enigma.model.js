const mongoose = require("mongoose");

const EnigmaSchema = new mongoose.Schema(
  {
    riddle: {
      type: String,
      required: true,
      trim: true,
    },
    answer: {
      type: String,
      required: true,
      trim: true,
    },
    dayLogic: { type: mongoose.Schema.Types.ObjectId, ref: "DayLogic" },
  },
  { timestamps: true }
);

const Enigma = mongoose.model("Enigma", EnigmaSchema);
module.exports = Enigma;
