//----------------------------------------(Importaciones)----------------------------------------------------------------------

const User = require("../models/User.model.js");
const FeedLogic = require("../models/FeedLogic.model.js");

//----------------------------------------(Create Logic)------------------------------------------------------------------------

const createLogic = async (req, res) => {
  try {
    console.log("Iniciando criação da lógica...");
    // Sincronizar índices de la logica
    await FeedLogic.syncIndexes();

    // Criando o objeto lógica
    const logicData = {
      content: req.body.content,
      logicFeedOwner: req.user._id,
    };

    // Criar nova instância de lógica
    const newLogic = new FeedLogic(logicData);

    // Salvar a lógica no banco de dados
    const savedLogic = await newLogic.save();

    // Atualizar o usuário com o ID da lógica criada
    await User.findByIdAndUpdate(req.user._id, {
      $push: { logicFeedOwner: newLogic._id },
    });

    console.log("Usuário atualizado com o ID da nova lógica.");

    // Retornar os dados da lógica criada na resposta
    return res.status(200).json(savedLogic);
  } catch (error) {
    console.error("Erro ao criar a lógica:", error);
    return res.status(400).json({
      error: "Error al crear la logica",
      message: error.message,
    });
  }
};

//----------------------------------------(Exportaciones)------------------------------------------------------------------------

module.exports = { createLogic };
