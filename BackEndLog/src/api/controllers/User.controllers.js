//----------------------------------------(Importaciones)------------------------------------------------------------------------

const User = require("../models/User.model.js");

//----------------------------------------(Get All Users)------------------------------------------------------------------------

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(404).json({
      error: "Error al buscar usuarios",
      message:
        "Se produjo un error al buscar todos los usuarios. Detalles del error: " +
        error.message,
    });
  }
};
//----------------------------------------(Get by ID User)------------------------------------------------------------------------
const getByIdUser = async (req, res) => {
  try {
    const { id } = req.params;
    const getById = await User.findById(id);
    res.status(200).json(getById);
  } catch (error) {
    res.status(404).json({
      error: "Error al buscar usuario",
      message:
        "Se produjo un error al buscar el usuario. Detalles del error: " +
        error.message,
    });
  }
};
//----------------------------------------(Exportaciones)------------------------------------------------------------------------

module.exports = { getAllUsers, getByIdUser };
