//----------------------------------(Importaciones)------------------------------------------------------------------------

const Enigma = require("../models/Enigma.model");
const enigmasData = require("../../data/enigmas.json");

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
//----------------------------------(Exportaciones)------------------------------------------------------------------------

module.exports = { createEnigmasFromData, getByIdEnigma, getAllEnigma };
