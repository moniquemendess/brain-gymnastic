const mongoose = require("mongoose");

const ResultsSchema = new mongoose.Schema({
  time: {
    type: Number,
    required: true,
  },

  // link logica -> Logica

  onwerResponse: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      type: String,
      required: true,
    },
  ],
});

const Results = mongoose.model("Results", ResultsSchema);

module.exports = Results;
