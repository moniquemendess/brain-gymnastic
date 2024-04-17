//------------------------------------(Importaciones)------------------------------------------------------------------

const { getDailyEnigma } = require("../controllers/DayLogic.controllers");

//----------------------------(Configuración de la Rutas con Express)----------------------------------------------------

const DayLogicRoutes = require("express").Router();

//----------------------------------------(Rutas)-----------------------------------------------------------------------

//localhost:8080/api/v1/dayLogic

DayLogicRoutes.get("/daily", getDailyEnigma);

//---------------------------------------(Rutas Privadas)--------------------------------------------------------------

// -----------------------------------(Exportaciones)-------------------------------------------------------------------

module.exports = DayLogicRoutes;
