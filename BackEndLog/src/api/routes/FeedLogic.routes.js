//------------------------------------(Importaciones)------------------------------------------------------------------

const { createLogic } = require("../controllers/FeedLogic.controllers");
const passport = require("passport");

//----------------------------(Configuración de la Rutas con Express)----------------------------------------------------

const FeedRoutes = require("express").Router();

//----------------------------------------(Rutas)-----------------------------------------------------------------------

FeedRoutes.post("/createLogic", createLogic),
  // -----------------------------------(Exportaciones)-------------------------------------------------------------------

  (module.exports = FeedRoutes);
