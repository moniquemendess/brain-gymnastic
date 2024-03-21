const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  nickName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
});
