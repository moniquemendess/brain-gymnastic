//------------------------------------(Importaciones)------------------------------------------------------------------

const { getAllUsers, getByIdUser } = require("../controllers/User.controllers");

//----------------------------(Configuración de la Rutas con Express)----------------------------------------------------

const UserRoutes = require("express").Router();

//----------------------------------------(Rutas)------------------------------------------------------------------------

UserRoutes.get("/getAllUsers", getAllUsers);
UserRoutes.get("/getByIdUser/:id", getByIdUser);

// -----------------------------------(Exportaciones)-------------------------------------------------------------------

module.exports = UserRoutes;
