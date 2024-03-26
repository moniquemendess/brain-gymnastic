const mongoose = require("mongoose");

const FeedLogicSchema = new mongoose.Schema({
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
  onwerComments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

const FeedLogic = mongoose.model("Logic", FeedLogicSchema);

module.exports = FeedLogic;
