//------------------------------------(Importaciones)------------------------------------------------------------------
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../api/models/User.model");
dotenv.config();

//------------------------------------(GenerateToken)------------------------------------------------------------------

const generateToken = (userId) => {
  const secret = process.env.SECRET_OR_KEY;
  const expiresIn = "1d"; // Expira em 1 dia

  return jwt.sign({ id: userId }, secret, { expiresIn });
};

//------------------------------------(check token)------------------------------------------------------------------

const checktoken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Dividir a string em array e acessar [1] o token

  if (!token) {
    return res.status(401).json({ message: "Aceso negado!" });
  }

  try {
    const secret = process.env.SECRET_OR_KEY;
    const decoded = jwt.verify(token, secret);

    // Verificar a data de expiração do token
    if (decoded.exp <= Date.now()) {
      throw new Error("Token expirado");
    }

    // Obter o usuário completo da base de dados
    const user = await User.findById(decoded.id);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    // Estabelecer req.user com o usuário obtido da base de dados
    req.user = user;

    next();
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Token inválido!" });
  }
};

//------------------------------------(Exportaciones)------------------------------------------------------------------

module.exports = { generateToken, checktoken };
