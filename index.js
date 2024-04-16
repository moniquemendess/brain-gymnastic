//-------------------------------------(Importaciones)-------------------------------------------------------------
const express = require("express");
const dotenv = require("dotenv");

const cors = require("cors");
const { connect } = require("./src/utils/db.js");

const files = require("./src/middleware/files.middleware.js");

//------------------------(Criación de servidor Express y configuración del middleware session )----------------------

const app = express();

//--------------------------------(Configurar dotenv para poder utilizar las variables de entorno del .env)-------

dotenv.config();

//--------------------------------(Creamos la conexión con la BD (base de datos))---------------------------------

connect();

//---------------------------------(Configuración de Cloudinary para gestión de img)------------------------------------

files.configCloudinary();

//---------------------------------(Permite solicitudes desde cualquier origen)------------------------------------

app.use(cors());

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));

//----------------------------------------(Rutas)------------------------------------------------------------------

// Ejemplo: http://localhost:8080/api/v1/users/getAllUsers

const UserRoutes = require("./src/api/routes/User.routes.js");
app.use("/api/v1/users/", UserRoutes);

const CommentRoutes = require("./src/api/routes/Comment.routes.js");
app.use("/api/v1/comment/", CommentRoutes);

const FeedLogicRoutes = require("./src/api/routes/FeedLogic.routes.js");
app.use("/api/v1/feedLogic/", FeedLogicRoutes);

//-----------------------------------(Configuración del servidor Express )----------------------------------------

const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
  console.log(`Server listening on port 👌🔍 http://localhost:${PORT}`)
);
