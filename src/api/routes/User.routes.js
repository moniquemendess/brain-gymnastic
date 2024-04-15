//------------------------------------(Importaciones)------------------------------------------------------------------

const { checktoken } = require("../../middleware/auth.middleware");
const {
  getAllUsers,
  getByIdUser,

  RegisterUser,
  login,
} = require("../controllers/User.controllers");

//----------------------------(Configuración de la Rutas con Express)----------------------------------------------------

const UserRoutes = require("express").Router();

//----------------------------------------(Rutas)------------------------------------------------------------------------
//localhost:8080/api/v1/users

UserRoutes.get("/getAllUsers", getAllUsers);
UserRoutes.post("/register", RegisterUser);
UserRoutes.post("/login", login);

//----------------------------------------(Rutas Privadas)--------------------------------------------------------------

UserRoutes.get("/getByIdUser/:id", checktoken, getByIdUser);

// -----------------------------------(Exportaciones)-------------------------------------------------------------------

module.exports = UserRoutes;
