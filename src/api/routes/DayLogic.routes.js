//------------------------------------(Importaciones)------------------------------------------------------------------

// const { data } = require("../../data/enigmas.json");
// const { createDayLogic } = require("../controllers/DayLogic.controllers");

//----------------------------(Configuración de la Rutas con Express)----------------------------------------------------

const DayLogicRoutes = require("express").Router();

//----------------------------------------(Rutas)-----------------------------------------------------------------------

//localhost:8080/api/v1/dayLogic

// DayLogicRoutes.get("/enigmas", (req, res) => {
//   let riddleObj = data[Math.floor(Math.random() * data.length)];
//   res.send(riddleObj);
// });

// DayLogicRoutes.post("/create", createAndScheduleEnigmaCreation);

//---------------------------------------(Rutas Privadas)--------------------------------------------------------------

// -----------------------------------(Exportaciones)-------------------------------------------------------------------

module.exports = DayLogicRoutes;
