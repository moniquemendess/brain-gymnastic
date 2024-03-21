const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      validator: [validator.isEmail, "Email not valid"],
      unique: true,
      trim: true,
    },
    rol: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    image: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["Man", "Women", "Others"],
      required: true,
    },
    password: {
      type: String,
      required: true,
      validate: [validator.isStrongPassword],
    },
    userComments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    userResponse: [{ type: mongoose.Schema.Types.ObjectId, ref: "Results" }],
    userLikedComments: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
    ],
    userLikedLogic: [{ type: mongoose.Schema.Types.ObjectId, ref: "Logic" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
