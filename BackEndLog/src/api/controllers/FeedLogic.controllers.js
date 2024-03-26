//----------------------------------------(Importaciones)----------------------------------------------------------------------

const User = require("../models/User.model.js");
const FeedLogic = require("../models/FeedLogic.model.js");

//----------------------------------------(Create Logic)------------------------------------------------------------------------

const createLogic = async (req, res) => {
  try {
    console.log("Iniciando criação da lógica...");
    // Sincronizar índices de la logica
    await FeedLogic.syncIndexes();

    // Creando el objeto logica
    const logicData = {
      content: req.body.content,
      logicFeedOwner: req.user._id,
    };

    // Criar nueva instância de logica
    const newLogic = new FeedLogic(logicData);

    // Salvar la  logica en el banco de dados
    const savedLogic = await newLogic.save();

    // Atualizar o usuário com o ID do logic criado
    await User.findByIdAndUpdate(req.user._id, {
      $push: { logicFeedOwner: newLogic._id },
    });
    console.log("Usuário atualizado com o ID da nova lógica.");
    return res.status(200).json("El usuario ha creado la logica");
  } catch (error) {
    console.error("Erro ao criar a lógica:", error);
    res.status(400).json({
      error: "Error al crear la logica",
      message: error.message,
    });
  }
};

//----------------------------------------(Exportaciones)------------------------------------------------------------------------

module.exports = { createLogic };
