const mongoose = require("mongoose");

const LogicSchema = {
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
  onwerResponse: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Results",
      type: String,
      required: true,
    },
  ],
  correctResponse: {
    type: String,
    trim: true,
  },
  ownerLiked: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  onwerComments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
};
