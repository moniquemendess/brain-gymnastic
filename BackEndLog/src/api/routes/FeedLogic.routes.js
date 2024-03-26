//------------------------------------(Importaciones)------------------------------------------------------------------

const { createLogic } = require("../controllers/FeedLogic.controllers");
const passport = require("passport");

//----------------------------(Configuración de la Rutas con Express)----------------------------------------------------

const FeedRoutes = require("express").Router();

//----------------------------------------(Rutas)-----------------------------------------------------------------------

FeedRoutes.post(
  "/createLogic",
  passport.authenticate("google", { failureRedirect: "/login" }),
  createLogic
);

// -----------------------------------(Exportaciones)-------------------------------------------------------------------

module.exports = FeedRoutes;
