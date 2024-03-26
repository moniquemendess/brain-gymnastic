//----------------------------------------(Importaciones)------------------------------------------------------------------------

const User = require("../models/User.model.js");
const FeedLogic = require("../models/FeedLogic.model.js");
const Comment = require("../models/Comment.model.js");

//----------------------------------------(Create Comments)------------------------------------------------------------------------

const createComments = async (req, res, next) => {
  try {
    // Verificar se o usuário está autenticado
    if (!req.user) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    const { idRecipient } = req.params;
    const findLogic = await FeedLogic.findById(idRecipient);

    if (findLogic) {
      const newComment = new Comment({
        ...req.body,
        userComments: req.user._id,
        onwerComments: findLogic,
      });
      const saveComment = await newComment.save();
      if (saveComment) {
        try {
          await FeedLogic.findByIdAndUpdate(idRecipient, {
            $push: { onwerComments: newComment._id },
          });
          await User.findByIdAndUpdate(req.user._id, {
            $push: { comments: newComment._id },
          });
          return res.status(200).json({
            create: true,
            saveComment,
            user: await User.findById(req.user._id),
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

/*const createComment = async (req, res, next) => {
  try {
    // Verificar se o usuário está autenticado
    if (!req.user) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    const { idRecipient } = req.params;
    const findLogic = await Logic.findById(idRecipient);

    // Verificar se a lógica foi encontrada
    if (!findLogic) {
      return res.status(404).json({ error: "Página lógica não encontrada" });
    }

    const newComment = new Comment({
      ...req.body,
      owner: req.user._id,
      recipientLogic: findLogic._id, // Alterado para armazenar apenas o ID da lógica
    });

    const saveComment = await newComment.save();

    // Usar transações para garantir a consistência dos dados
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      await Logic.findByIdAndUpdate(
        idRecipient,
        { $push: { comments: saveComment._id } },
        { session }
      );
      await User.findByIdAndUpdate(
        req.user._id,
        { $push: { comments: saveComment._id } },
        { session }
      );
      await session.commitTransaction();

      // Responder com uma estrutura de resposta melhorada
      res.status(200).json({
        success: true,
        message: "Comentário criado com sucesso",
        comment: saveComment,
        user: await User.findById(req.user._id),
      });
    } catch (error) {
      await session.abortTransaction(); // Em caso de erro, abortar a transação
      throw error; // Lançar o erro para o bloco catch externo lidar
    } finally {
      session.endSession(); // Finalizar a sessão da transação
    }
  } catch (error) {
    // Lidar com erros
    res.status(500).json({
      error: "Erro ao criar comentário na página lógica",
      message: error.message,
    });
    next(error);
  }
};
*/
