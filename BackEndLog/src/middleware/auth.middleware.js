
//------------------------------------(Importaciones)------------------------------------------------------------------
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

//------------------------------------(Chequear token)------------------------------------------------------------------

const checktoken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // dividir las string en array y acender [1] el token

  if (!token) {
    return res.status(401).json({ message: "Aceso negado!" });
  }
  try {
    const secret = process.env.SECRET_OR_KEY;
    jwt.verify(token, secret);
    next();
  } catch (error) {
    res.status(400).json({ message: "token invalido!" });
  }
};

//------------------------------------(Exportaciones)------------------------------------------------------------------

module.exports = {
  checktoken,
};

