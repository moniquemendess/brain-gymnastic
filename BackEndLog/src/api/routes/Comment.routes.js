//------------------------------------(Importaciones)------------------------------------------------------------------

const { createComments } = require("../controllers/Comment.controllers");
const passport = require("passport"); // Corrected import statement

//----------------------------(Configuración de la Rutas con Express)----------------------------------------------------

const CommentRoutes = require("express").Router();

//----------------------------------------(Rutas)-----------------------------------------------------------------------

CommentRoutes.post(
  "/createComments/:idRecipient",
  passport.authenticate("google", { failureRedirect: "/login" }),
  createComments
);

// -----------------------------------(Exportaciones)-------------------------------------------------------------------

module.exports = CommentRoutes;
