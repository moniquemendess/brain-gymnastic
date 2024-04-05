//------------------------------------(Importaciones)------------------------------------------------------------------


const { checktoken } = require("../../middleware/auth.middleware");
const {
  createFeedLogic,
  getAllFeedLogic,
} = require("../controllers/FeedLogic.controllers");

//----------------------------(Configuración de la Rutas con Express)----------------------------------------------------

const FeedLogicRoutes = require("express").Router();

//----------------------------------------(Rutas)-----------------------------------------------------------------------


FeedLogicRoutes.get("/getAllFeedLogic", getAllFeedLogic);

//---------------------------------------(Rutas Privadas)--------------------------------------------------------------

FeedLogicRoutes.post("/createFeedLogic", checktoken, createFeedLogic);


// FeedLogicRoutes.post(
//   "/createFeedLogic",
//   passport.authenticate("jwt", { session: false }),
//   createFeedLogic
// );
// -----------------------------------(Exportaciones)-------------------------------------------------------------------

module.exports = FeedLogicRoutes;
