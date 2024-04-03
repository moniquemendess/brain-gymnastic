const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  //console.log("Encabezado de autorización:", authHeader);

  if (!authHeader) {
    console.log("Token no proporcionado");
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  // Separar la cadena del encabezado de autorización y obtener solo el token
  const tokenParts = authHeader.split(" ");
  const tokenValue = tokenParts[1]; // El token está en la segunda parte

  console.log("secret", process.env.SECRET_OR_KEY);
  console.log("soy la primera parte del token", tokenValue);

  // Decodificar manualmente el token JWT
  try {
    console.log("Antes de la verificación del token");
    const decoded = jwt.verify(tokenValue, process.env.SECRET_OR_KEY);
    console.log("Token decodificado:", decoded);
    console.log("Después de la verificación del token");
    console.log("secret", process.env.SECRET_OR_KEY);
    console.log("soy la primera parte del token", tokenValue);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("Error al decodificar el token:", error.message);
    return res.status(401).json({ message: "Token inválido" });
  }
};

module.exports = { verifyToken };
