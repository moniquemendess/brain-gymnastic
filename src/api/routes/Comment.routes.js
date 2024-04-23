//------------------------------------(Importaciones)------------------------------------------------------------------

const { checktoken } = require("../../middleware/auth.middleware");
const {
  createComments,
  getAllComments,
  getByIdComment,
  deleteComment,
  likeComment,
} = require("../controllers/Comment.controllers");

//----------------------------(Configuración de la Rutas con Express)----------------------------------------------------

const CommentRoutes = require("express").Router();

//----------------------------------------(Rutas)-----------------------------------------------------------------------

//localhost:8080/api/v1/comment

CommentRoutes.get("/allComments", getAllComments);
CommentRoutes.get("/idComments/:id", getByIdComment);

//----------------------------------------(Rutas Privadas)-----------------------------------------------------------------------

CommentRoutes.post("/createComments/:id", checktoken, createComments);

CommentRoutes.delete("/deleteComment/:idComment", deleteComment);
CommentRoutes.patch("/likeComment/:idComment", likeComment);

// -----------------------------------(Exportaciones)-------------------------------------------------------------------

module.exports = CommentRoutes;
