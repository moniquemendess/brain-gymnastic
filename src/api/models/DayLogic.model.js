const mongoose = require("mongoose");

const DayLogicSchema = new mongoose.Schema(
  {
    enigma: {
      // Adicionando referência ao enigma
      type: mongoose.Schema.Types.ObjectId,
      ref: "Enigma", // Nome do modelo de enigma
    },

    owner: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

const DayLogic = mongoose.model("DayLogic", DayLogicSchema);

module.exports = DayLogic;
