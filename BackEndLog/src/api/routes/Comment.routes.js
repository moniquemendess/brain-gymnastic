//------------------------------------(Importaciones)------------------------------------------------------------------

const { checktoken } = require("../../middleware/auth.middleware");
const { createComments } = require("../controllers/Comment.controllers");

//----------------------------(Configuración de la Rutas con Express)----------------------------------------------------

const CommentRoutes = require("express").Router();

//----------------------------------------(Rutas)-----------------------------------------------------------------------

//localhost:8080/api/v1/comment

//----------------------------------------(Rutas Privadas)-----------------------------------------------------------------------

CommentRoutes.post("/createComments/:idRecipient", checktoken, createComments);

// -----------------------------------(Exportaciones)-------------------------------------------------------------------

module.exports = CommentRoutes;
