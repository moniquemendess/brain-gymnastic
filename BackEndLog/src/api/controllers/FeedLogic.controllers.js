//----------------------------------------(Importaciones)----------------------------------------------------------------------

const User = require("../models/User.model.js");
const FeedLogic = require("../models/FeedLogic.model.js");

//----------------------------------------(Create Logic)------------------------------------------------------------------------

const createFeedLogic = async (req, res) => {
  try {
    const feedLogic = new FeedLogic({
      content: req.body.content,
      owner: req.user._id,
    });
    console.log(feedLogic);
    // Aguarda hasta con el feedLogic es salvo en el banco de datos antes de continuar con la ejecución abajo de codigos
    await feedLogic.save();

    // Recupera el documento populado con los detalles del usuario
    const feedLogicPopulated = await FeedLogic.findById(feedLogic._id).populate(
      "owner"
    );

    // Atualize o array de feeds no objeto do usuário
    const user = await User.findById(req.user._id);
    user.feeds.push(feedLogic._id); // Adiciona o ID do feed ao array de feeds do usuário
    await user.save(); // Salva as alterações no banco de dados

    res.status(200).send({
      message: "Logica creada con suceso!",
      feedLogic: feedLogicPopulated,
    });
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Error al cargar la lógica" });
  }
};

//----------------------------------------(Get All Feed Logic)-------------------------------------------------------------------

const getAllFeedLogic = async (req, res) => {
  try {
    const data = await FeedLogic.find({});
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({ message: "Error al cargar las lógicas" });
  }
};
//----------------------------------------(Exportaciones)------------------------------------------------------------------------

module.exports = { createFeedLogic, getAllFeedLogic };
