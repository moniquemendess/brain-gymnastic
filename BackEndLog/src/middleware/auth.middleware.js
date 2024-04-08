//------------------------------------(Importaciones)------------------------------------------------------------------
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../api/models/User.model");
dotenv.config();

//------------------------------------(Chequear token)------------------------------------------------------------------

const checktoken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // dividir las string en array y acender [1] el token

  if (!token) {
    return res.status(401).json({ message: "Aceso negado!" });
  }
  try {
    const secret = process.env.SECRET_OR_KEY;
    const decoded = jwt.verify(token, secret);

    // Obtener el usuario completo desde la base de datos
    const user = await User.findById(decoded.id);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    // Establecer req.user con el usuario obtenido de la base de datos
    req.user = user;

    next();
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Token inválido!" });
  }
};

module.exports = {
  checktoken,
};

//------------------------------------(Exportaciones)------------------------------------------------------------------

module.exports = {
  checktoken,
};
