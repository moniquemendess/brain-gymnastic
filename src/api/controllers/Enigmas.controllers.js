//----------------------------------(Importaciones)------------------------------------------------------------------------

const Enigma = require("../models/Enigma.model");
const enigmasData = require("../../data/enigmas.json");
const User = require("../models/User.model");

//----------------------------------(Create Enigmas)------------------------------------------------------------------------

const createEnigmasFromData = async () => {
  try {
    for (const enigmaData of enigmasData) {
      const enigma = new Enigma({
        riddle: enigmaData.riddle,
        answer: enigmaData.answer,
      });

      await enigma.save();
    }
  } catch (error) {
    console.error("Erro ao criar enigmas:", error);
    throw new Error("Erro ao criar enigmas");
  }
};

// createEnigmasFromData();
//----------------------------------(Get By Id)------------------------------------------------------------------------

const getByIdEnigma = async (req, res) => {
  try {
    const { id } = req.params;
    const byIdEnigma = await Enigma.findById(id);
    res.status(200).json(byIdEnigma);
  } catch (error) {
    res.status(404).json({ message: "Enigma no encontrada" });
  }
};

//----------------------------------(Get All)------------------------------------------------------------------------

const getAllEnigma = async (req, res) => {
  try {
    const byAllEnigma = await Enigma.find();
    res.status(200).json(byAllEnigma);
  } catch (error) {
    res.status(404).json({ message: "Enigma no encontrada" });
  }
};

//----------------------------------------(Funciones auxiliares (Update User Liked Enigma))----------------------------------------------------------------

// Función updateUserLikedEnigmas es responsable por actualizar a lista de enigmas curtidos

const updateUserLiked = async (_id, idEnigma, push = true) => {
  try {
    const updateOperation = push
      ? { $push: { userLikedEnigmas: idEnigma } }
      : { $pull: { userLikedEnigmas: idEnigma } };

    await User.findByIdAndUpdate(_id, updateOperation);
  } catch (error) {
    throw new Error("Error al actualizar los enigmas que le gustan al usuario");
  }
};

//----------------------------------------(Funciones auxiliares (Update Liked Feed))----------------------------------------------------------------

// Función updateLikedEnigma es responsable por actualizar a lista de usuarios que curtiran el enigma

const updateLikedEnigma = async (idEnigma, _id, push = true) => {
  try {
    const updateOperation = push
      ? { $push: { likes: _id } }
      : { $pull: { likes: _id } };

    await Enigma.findByIdAndUpdate(idEnigma, updateOperation);
  } catch (error) {
    throw new Error("Error al actualizar los 'me gusta' del enigma");
  }
};
//----------------------------------------(Liked Enigma)----------------------------------------------------------------

const LikedEnigma = async (req, res, next) => {
  try {
    const { idEnigma } = req.params; // id del enigma
    const { _id, userLikedEnigmas } = req.user;

    const isLiked = userLikedEnigmas.includes(idEnigma);
    if (isLiked) {
      await updateUserLiked(_id, idEnigma, false);
      await updateLikedEnigma(idEnigma, _id, false);
    } else {
      await updateUserLiked(_id, idEnigma);
      await updateLikedEnigma(idEnigma, _id);
    }

    const user = await User.findById(_id);
    const enigma = await Enigma.findById(idEnigma).populate("likes");

    return res.status(200).json({ message: user, enigma });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error general", message: error.message });
  }
};

//----------------------------------(Exportaciones)------------------------------------------------------------------------

module.exports = {
  createEnigmasFromData,
  getByIdEnigma,
  getAllEnigma,
  LikedEnigma,
};
