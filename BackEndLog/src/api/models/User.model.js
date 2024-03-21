const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
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
  password: {
    type: String,
    required: true,
    validate: [validator.isStrongPassword],
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
