const express = require("express");
const dotenv = require("dotenv");

// Creamos el servidor web.
const app = express();
// Vamos a configurar dotenv para poder utilizar las variables de entorno del .env
dotenv.config();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server listening on port 👌🔍 http://localhost:${PORT}`)
);
