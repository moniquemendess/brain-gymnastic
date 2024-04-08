const mongoose = require("mongoose");

const FeedLogicSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
    },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    ownerLiked: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

const FeedLogic = mongoose.model("FeedLogic", FeedLogicSchema);

module.exports = FeedLogic;
