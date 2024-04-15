//----------------------------------------(Importaciones)----------------------------------------------------------------------

const User = require("../models/User.model.js");
const FeedLogic = require("../models/FeedLogic.model.js");
const Comment = require("../models/Comment.model.js");
const { deleteImgCloudinary } = require("../../middleware/files.middleware.js");

//----------------------------------------(Create Logic)------------------------------------------------------------------------

const createFeedLogic = async (req, res) => {
  try {
    const processedText = req.body.content.replace(/\r\n|\r|\n/g, "<br>");

    const customBody = {
      content: processedText,
      owner: req.user._id,
    };

    const newFeed = new FeedLogic(customBody);

    // Verifica se uma imagem foi enviada com a solicitação
    if (req.file) {
      newFeed.image = req.file.path;
    }

    await newFeed.save();

    const feedLogicPopulated = await FeedLogic.findById(newFeed._id).populate(
      "owner"
    );

    const user = await User.findById(req.user._id);
    user.logicFeedOwner.push(newFeed._id);
    await user.save();

    res.status(200).send({
      message: "¡Lógica creada con éxito!",
      feedLogic: feedLogicPopulated,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error al crear la lógica de feed" });
  }
};
//----------------------------------------(UpdateFeed)-------------------------------------------------------------------
const updateFeed = async (req, res, next) => {
  await FeedLogic.syncIndexes();
  let catchImg = req.file?.path;
  try {
    console.log("Iniciando a sincronização de índices...");
    await FeedLogic.syncIndexes();
    console.log("Sincronização de índices concluída com sucesso.");

    const { id } = req.params;
    console.log("ID extraído dos parâmetros da solicitação:", id);

    const feedById = await FeedLogic.findById(id);
    console.log("Feed encontrado na base de dados:", feedById);

    if (feedById) {
      const oldImg = feedById.image;

      // Se construye el objeto de campos personalizado para la actualización
      const customBody = {
        _id: feedById._id,
        image: req.file?.path ? catchImg : oldImg,
        content: req.body?.content ? req.body?.content : feedById.content,
      };
      console.log("Objeto customBody para atualização:", customBody);

      try {
        await FeedLogic.findByIdAndUpdate(id, customBody);
        console.log("Feed atualizado na base de dados:", feedByIdUpdate);

        if (req.file?.path) {
          deleteImgCloudinary(oldImg);
        }

        //----------------------* Test *----------------------------------------------------------------

        //Se busca el elemento actualizado vía id
        const feedByIdUpdate = await FeedLogic.findById(id);

        // Se sacan las claves del req.body para saber qué elementos actualizar
        const elementUpdate = Object.keys(req.body);

        // Objeto vacío donde posteriormente se meterán los test
        let test = {};

        // Se recorren las claves del body y se crea un objeto con los test
        elementUpdate.forEach((item) => {
          if (req.body[item] === feedByIdUpdate[item]) {
            test[item] = true;
          } else {
            test[item] = false;
          }
        });

        if (catchImg) {
          feedByIdUpdate.image === catchImg
            ? (test = { ...test, file: true })
            : (test = { ...test, file: false });
        }

        // Se comprueba si hay un "false". Hay false --> Se lanza un 404.
        // Si no hay false --> Se lanza un 200, todo OK.

        let acc = 0;
        for (clave in test) {
          test[clave] == false && acc++;
        }

        if (acc > 0) {
          return res.status(404).json({
            dataTest: test,
            update: false,
          });
        } else {
          return res.status(200).json({
            dataTest: test,
            update: true,
          });
        }
      } catch (error) {
        res.status(200).json({ message: "Alterado" });
      }
    } else {
      return res.status(404).json("Este feed no existe");
    }
  } catch (error) {
    console.log("Erro durante a atualização do feed:", error);
    return res.status(404).json(error);
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

//----------------------------------------(Get by id Feed Logic)-------------------------------------------------------------------

const getByIdFeedLogic = async (req, res) => {
  try {
    const { id } = req.params; // id de la logica por params
    const byIdFeedLogic = await FeedLogic.findById(id);
    res.status(200).json(byIdFeedLogic);
  } catch (error) {
    res.status(404).json({ message: "Logica no encontrada" });
  }
};
//----------------------------------------(Funciones auxiliares (Update User LikeFeedLogic))----------------------------------------------------------------

// Función updateUserLikedFeed es responsable por actualizar a lista de feed curtidos

const updateUserLikedFeed = async (_id, idFeed, push = true) => {
  try {
    const updateOperation = push
      ? { $push: { userLikedFeedLogic: idFeed } }
      : { $pull: { userLikedFeedLogic: idFeed } };

    await User.findByIdAndUpdate(_id, updateOperation);
  } catch (error) {
    throw new Error("Error al actualizar los feed que le gustan al usuario");
  }
};
//----------------------------------------(Funciones auxiliares (Update Liked Feed))----------------------------------------------------------------

// Función updateUserLikedFeed es responsable por actualizar a lista de usuarios que curtiran el feed

const updateLikedFeed = async (idFeed, _id, push = true) => {
  try {
    const updateOperation = push
      ? { $push: { likes: _id } }
      : { $pull: { likes: _id } };

    await FeedLogic.findByIdAndUpdate(idFeed, updateOperation);
  } catch (error) {
    throw new Error("Error al actualizar los 'me gusta' del feed");
  }
};
//----------------------------------------(Liked Feed)----------------------------------------------------------------

const LikedFeed = async (req, res, next) => {
  try {
    const { idFeed } = req.params; // id del feed
    const { _id, userLikedFeedLogic } = req.user;

    const isLiked = userLikedFeedLogic.includes(idFeed);
    if (isLiked) {
      await updateUserLikedFeed(_id, idFeed, false);
      await updateLikedFeed(idFeed, _id, false);
    } else {
      await updateUserLikedFeed(_id, idFeed);
      await updateLikedFeed(idFeed, _id);
    }

    const user = await User.findById(_id);
    const feedLogic = await FeedLogic.findById(idFeed).populate("likes");

    return res.status(200).json({ message: user });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error general", message: error.message });
  }
};

//----------------------------------------(Delete Feed Logic)-------------------------------------------------------------------

const deleteFeedLogic = async (req, res, next) => {
  try {
    const { id } = req.params; // Obtener el ID del la logica a ser eliminada
    const feedOnwer = req.user._id; // Obtener el ID del usuario autenticado

    const feedLogic = await FeedLogic.findById(id); // Encontrar la logica en la base de datos para continuar ...

    // Si no tienes logica o si el usuario autententicado no es el owner de la logica de feed
    if (!feedLogic || !feedLogic.owner.equals(feedOnwer)) {
      return res.status(404).json({
        message: "La logica no existe o no tienes permiso para eliminarlo",
      });
    }

    const commentIds = []; // Se crea un array vacío para encontrar posteriormente los comentarios hechos en la page feedlogic

    /* Se buscan todos los comentarios que viven en ese page, para que luego(.then) usando la response, se recorran todos 
    ellos. Finalmente se añaden los ids de esos commentarios a la lista de array vacía (commentIds) */
    await Comment.find({ recipientFeedLogic: id }).then((res) => {
      res.forEach((comment) => {
        commentIds.push(comment._id);
      });
    });

    // Actualizar las referencias en otros modelos de datos si es necesario
    await User.updateMany(
      { logicFeedOwner: id },
      { $pull: { logicFeedOwner: id } }
    );

    // Eliminar todos los comentarios en la logica
    await Comment.deleteMany({ recipientFeedLogic: id });

    await User.updateMany(
      {}, // Objecto vacío para realizar la operación en todos los usuarios
      { $pull: { userComments: { $in: commentIds } } }
    );
    await User.updateMany(
      { $or: [{ likes: id }, { userLikedFeedLogic: id }] },
      { $pull: { likes: id, userLikedFeedLogic: id } }
    );

    // Eliminar la logica
    await FeedLogic.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Logica eliminada correctamente",
      user: req.user._id,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error al eliminar la logica",
      message: error.message,
    });
  }
};
//----------------------------------------(Exportaciones)------------------------------------------------------------------------

module.exports = {
  createFeedLogic,
  updateFeed,
  getAllFeedLogic,
  getByIdFeedLogic,
  LikedFeed,
  deleteFeedLogic,
};