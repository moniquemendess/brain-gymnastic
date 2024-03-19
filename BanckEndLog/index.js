const express = require("express");
const dotenv = require("dotenv");
const { connect } = require("./src/utils/db");
const cors = require("cors");

// Creamos el servidor web.
const app = express();

// Configurar dotenv para poder utilizar las variables de entorno del .env
dotenv.config();

// Creamos la conexión con la BD (base de datos)
connect();

// Permite solicitudes desde cualquier origen
app.use(cors());

const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
  console.log(`Server listening on port 👌🔍 http://localhost:${PORT}`)
);
