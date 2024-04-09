//------------------------------------(Importaciones)------------------------------------------------------------------

const { checktoken } = require("../../middleware/auth.middleware");
const {
  createFeedLogic,
  getAllFeedLogic,
  getByIdFeedLogic,
  deleteFeedLogic,
} = require("../controllers/FeedLogic.controllers");

//----------------------------(Configuración de la Rutas con Express)----------------------------------------------------

const FeedLogicRoutes = require("express").Router();

//----------------------------------------(Rutas)-----------------------------------------------------------------------

//localhost:8080/api/v1/feedLogic

FeedLogicRoutes.get("/getAllFeedLogic", getAllFeedLogic);
FeedLogicRoutes.get("/idFeedLogic/:id", getByIdFeedLogic);

//---------------------------------------(Rutas Privadas)--------------------------------------------------------------

FeedLogicRoutes.post("/createFeedLogic", checktoken, createFeedLogic);
FeedLogicRoutes.delete("/deleteFeed/:id", checktoken, deleteFeedLogic);

// -----------------------------------(Exportaciones)-------------------------------------------------------------------

module.exports = FeedLogicRoutes;
