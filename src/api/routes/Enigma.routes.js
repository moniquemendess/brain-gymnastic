//------------------------------------(Importaciones)------------------------------------------------------------------

const {
  getByIdEnigma,
  getAllEnigma,
} = require("../controllers/Enigmas.controllers");

//----------------------------(Configuración de la Rutas con Express)----------------------------------------------------

const EnigmaRoutes = require("express").Router();

//----------------------------------------(Rutas)-----------------------------------------------------------------------

//localhost:8080/api/v1/enigma

EnigmaRoutes.get("/byIdEnigma/:id", getByIdEnigma);
EnigmaRoutes.get("/all", getAllEnigma);

//----------------------------------------(Rutas Privadas)-----------------------------------------------------------------------

// -----------------------------------(Exportaciones)-------------------------------------------------------------------

module.exports = EnigmaRoutes;
