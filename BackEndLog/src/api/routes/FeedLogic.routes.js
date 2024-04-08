//------------------------------------(Importaciones)------------------------------------------------------------------

const { checktoken } = require("../../middleware/auth.middleware");
const {
  createFeedLogic,
  getAllFeedLogic,
  getByIdFeedLogic,
} = require("../controllers/FeedLogic.controllers");

//----------------------------(Configuración de la Rutas con Express)----------------------------------------------------

const FeedLogicRoutes = require("express").Router();

//----------------------------------------(Rutas)-----------------------------------------------------------------------

//localhost:8080/api/v1/feedLogic

FeedLogicRoutes.get("/getAllFeedLogic", getAllFeedLogic);
FeedLogicRoutes.get("/idFeedLogic/:id", getByIdFeedLogic);

//---------------------------------------(Rutas Privadas)--------------------------------------------------------------

FeedLogicRoutes.post("/createFeedLogic", checktoken, createFeedLogic);

// -----------------------------------(Exportaciones)-------------------------------------------------------------------

module.exports = FeedLogicRoutes;
