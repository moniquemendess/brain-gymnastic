//------------------------------------(Importaciones)------------------------------------------------------------------
const { verifyToken } = require("../../middleware/auth.middleware");
const {
  createFeedLogic,
  getAllFeedLogic,
} = require("../controllers/FeedLogic.controllers");

//----------------------------(Configuración de la Rutas con Express)----------------------------------------------------

const FeedLogicRoutes = require("express").Router();

//----------------------------------------(Rutas)-----------------------------------------------------------------------

FeedLogicRoutes.post("/createFeedLogic", verifyToken, createFeedLogic);

FeedLogicRoutes.get("/getAllFeedLogic", getAllFeedLogic);

// FeedLogicRoutes.post(
//   "/createFeedLogic",
//   passport.authenticate("jwt", { session: false }),
//   createFeedLogic
// );
// -----------------------------------(Exportaciones)-------------------------------------------------------------------

module.exports = FeedLogicRoutes;
