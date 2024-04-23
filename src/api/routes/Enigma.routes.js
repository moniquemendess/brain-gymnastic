//------------------------------------(Importaciones)------------------------------------------------------------------

const {
  getByIdEnigma,
  getAllEnigma,
  LikedEnigma,
} = require("../controllers/Enigmas.controllers");

//----------------------------(Configuración de la Rutas con Express)----------------------------------------------------

const EnigmaRoutes = require("express").Router();

//----------------------------------------(Rutas)-----------------------------------------------------------------------

//localhost:8080/api/v1/enigma

EnigmaRoutes.get("/byIdEnigma/:id", getByIdEnigma);
EnigmaRoutes.get("/all", getAllEnigma);

//----------------------------------------(Rutas Privadas)-----------------------------------------------------------------------

EnigmaRoutes.patch("/like/:idEnigma", LikedEnigma);

// -----------------------------------(Exportaciones)-------------------------------------------------------------------

module.exports = EnigmaRoutes;
