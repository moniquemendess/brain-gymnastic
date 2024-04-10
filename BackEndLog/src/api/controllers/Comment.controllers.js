//----------------------------------------(Importaciones)------------------------------------------------------------------------

const User = require("../models/User.model.js");
const FeedLogic = require("../models/FeedLogic.model.js");
const Comment = require("../models/Comment.model.js");

//----------------------------------------(Create Comments)------------------------------------------------------------------------

const createComments = async (req, res, next) => {
  try {
    // Verificar si el usuario esta autenticado
    if (!req.user) {
      return res.status(401).json({ error: "Usuario no autenticado" });
    }

    const { idRecipient } = req.params; // id la logica por params
    const findLogic = await FeedLogic.findById(idRecipient); //busca el id de la logica armazenado en la variable idRecipient

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
            $push: { comments: newComment._id }, // clave de model de datos Comment
          });
          await User.findByIdAndUpdate(req.user._id, {
            // actualiza la coleccion con el user autenticado con el id del comentario
            $push: { userComments: newComment._id }, // clave de model de datos User
          });
          return res.status(200).json({
            create: true,
            saveComment,
            user: await User.findById(req.user._id), // user autenticado y actualizado con id del comentario
          });
        } catch (error) {
          res.status(404).json({
            error: "Error al actualizar la pagina de feedlogic y el usuario",
            message: error.message,
          }) && next(error);
        }
      }
    }
  } catch (error) {
    res.status(404).json({
      error: "Error general al crear comentario",
      message: error.message,
    }) && next(error);
  }
};
//----------------------------------------(Get all Comments)------------------------------------------------------------------------

const getAllComments = async (req, res) => {
  try {
    const allComments = await Comment.find({});
    res.status(200).json(allComments);
  } catch (error) {
    res.status(404).json({ menssage: "Error al cargar todos los comentarios" });
  }
};

//----------------------------------------(Get by ID)------------------------------------------------------------------------

const getByIdComment = async (req, res) => {
  try {
    const { id } = req.params;
    const byIdComment = await Comment.findById(id);
    res.status(200).json(byIdComment);
  } catch (error) {
    res.status(404).json({ menssage: "Comentario no encontrado" });
  }
}; //-------------------------(Funciones auxilares (Update User LikedComments))-------------------------------------------------------------------

// Función updateUserLikedComments es responsable por actualizar a lista de comentarios curtidos
// por el usuario en la base de datos.

const updateUserLikedComments = async (_id, idComment, push = true) => {
  try {
    const updateOperation = push
      ? { $push: { userLikedComments: idComment } }
      : { $pull: { userLikedComments: idComment } };
    await User.findByIdAndUpdate(_id, updateOperation);
  } catch (error) {
    throw new Error(
      "Error al actualizar los comentarios que le gustan al usuario"
    );
  }
};

//-----------------------------(Funciones auxilares (Update Comment Likes))------------------------------------------------------------------------

// Función updateCommentLikes es responsable por actualizar la lista de usuarios que curtiran
// un determinado comentario en la base de datos.

const updateCommentLikes = async (idComment, _id, push = true) => {
  try {
    const updateOperation = push
      ? { $push: { likes: _id } }
      : { $pull: { likes: _id } };
    await Comment.findByIdAndUpdate(idComment, updateOperation);
  } catch (error) {
    throw new Error("Error al actualizar los 'me gusta' del comentario");
  }
};

//--------------------------------------(like Comment)-----------------------------------------------------------------------------------------------

// Funcón likeComment es la logica de curtir y descurtir un comentario
const likeComment = async (req, res, next) => {
  try {
    const { idComment } = req.params;
    const { _id, userLikedComments } = req.user;

    const isLiked = userLikedComments.includes(idComment);

    if (isLiked) {
      await updateUserLikedComments(_id, idComment, false);
      await updateCommentLikes(idComment, _id, false);
    } else {
      await updateUserLikedComments(_id, idComment);
      await updateCommentLikes(idComment, _id);
    }

    const user = await User.findById(_id);
    const comment = await Comment.findById(idComment).populate("likes");

    return res.status(200).json({ user, comment });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error general", message: error.message });
  }
};

//----------------------------------------(Delete Comment)------------------------------------------------------------------------

const deleteComment = async (req, res, next) => {
  try {
    const { idComment } = req.params; // Obtener el ID del comentario de los parámetros de la ruta
    const commentOwner = req.user._id; // Obtener el ID del usuario autenticado

    const comment = await Comment.findById(idComment); // Encontrar el comentario en la base de datos

    // Verificar si el comentario existe y si el usuario autenticado es el propietario del comentario
    if (!comment || !comment.owner.equals(commentOwner)) {
      return res.status(404).json({
        error: "El comentario no existe o no tienes permiso para eliminarlo",
      });
    }

    // Actualizar las referencias en otros modelos de datos si es necesario
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { userComments: idComment } },
      { new: true }
    );
    await User.updateMany(
      { $or: [{ likes: idComment }, { userLikedComments: idComment }] },
      { $pull: { likes: idComment, userLikedComments: idComment } }
    );

    await FeedLogic.updateMany({
      $pull: { comments: idComment },
    });
    // Eliminar el comentario
    await Comment.findByIdAndDelete(idComment);

    return res.status(200).json({
      message: "Comentario eliminado correctamente",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error al eliminar el comentario",
      message: error.message,
    });
  }
};

//----------------------------------------(Exportaciones)------------------------------------------------------------------------

module.exports = {
  createComments,
  getAllComments,
  getByIdComment,
  likeComment,
  deleteComment,
};
