//----------------------------------------(Importaciones)------------------------------------------------------------------------

const User = require("../models/User.model.js");
const FeedLogic = require("../models/FeedLogic.model.js");
const Comment = require("../models/Comment.model.js");

//----------------------------------------(Create Comments)------------------------------------------------------------------------

const createComments = async (req, res, next) => {
  try {
    // Verificar se o usuário está autenticado
    if (!req.user) {
      return res.status(401).json({ error: "Usuario no autenticado" });
    }

    const { idRecipient } = req.params; // id del comentario por params
    const findLogic = await FeedLogic.findById(idRecipient); //busca el id armazenado en la variable idRecipient

    // creacion de nueva estancia de comentario
    if (findLogic) {
      const newComment = new Comment({
        ...req.body,
        owner: req.user._id, // clave de model de datos comment
        recipientFeedLogic: findLogic, // clave de model de datos comment
      });
      const saveComment = await newComment.save(); // salvar el comentario en banco de datos
      if (saveComment) {
        try {
          await FeedLogic.findByIdAndUpdate(idRecipient, {
            //actualiza la coleccion FeedLogic con el id del comentario
            $push: { userComments: newComment._id }, // clave de model de datos User
          });
          await User.findByIdAndUpdate(req.user._id, {
            // actualiza la coleccion con el user autenticado con on el id del comentario
            $push: { userComments: newComment._id }, // clave de model de datos User
          });
          return res.status(200).json({
            create: true,
            saveComment,
            user: await User.findById(req.user._id), // user autenticado y actualizado con id del comentario
          });
        } catch (error) {
          res.status(404).json({
            error: "Error actualizando la noticia y el usuario",
            message: error.message,
          }) && next(error);
        }
      }
    }
  } catch (error) {
    res.status(404).json({
      error: "Error general al crear comentario en logic",
      message: error.message,
    }) && next(error);
  }
};

//----------------------------------------(Exportaciones)------------------------------------------------------------------------

module.exports = { createComments };
