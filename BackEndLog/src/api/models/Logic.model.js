const mongoose = require("mongoose");

const LogicSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
  },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
  },

  correctResponse: {
    type: String, // boolean?
  },
  ownerLiked: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  onwerComments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

const Logic = mongoose.model("Logic", LogicSchema);

module.exports = Logic;
