//-------------------------------------(Importaciones)-------------------------------------------------------------

const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");
// const passportLocalMongoose = require("passport-local-mongoose");
//------------------------------------------------------------------------------------------------------------------

//! En insomnia no aparece el email? pesquisar
const Schema = mongoose.Schema;
const UserSchema = new mongoose.Schema(
  {
    username: { type: String },
    googleId: { type: String, unique: true },
    email: { type: String, unique: true },
    rol: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    image: {
      type: String,
    },
    logicFeedOwner: [
      { type: mongoose.Schema.Types.ObjectId, ref: "FeedLogic" },
    ], // quien crea la logica en la page de (Feed Logic)
    userComments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    userResponse: [{ type: mongoose.Schema.Types.ObjectId, ref: "Results" }],
    userLikedComments: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
    ],
    userLikedLogic: [{ type: mongoose.Schema.Types.ObjectId, ref: "Logic" }],
  },
  { timestamps: true }
);
//------------------------------------------------------------------------------------------------------------------
//Agregamos find o create al schema
UserSchema.plugin(findOrCreate);

const User = mongoose.model("User", UserSchema);

module.exports = User;
