//----------------------------------------(Importaciones)------------------------------------------------------------------------

const User = require("../models/User.model.js");
const bcrypt = require("bcrypt");
const { generateToken } = require("../../middleware/auth.middleware.js");

//----------------------------------------(Registro User)------------------------------------------------------------------------

const RegisterUser = async (req, res) => {
  const { userName, email, password, confirmpassword } = req.body;

  // validacion
  if (!userName || !email || !password || !confirmpassword) {
    return res
      .status(422)
      .json({ message: "Todos los campos son obligatorios." });
  }

  if (password !== confirmpassword) {
    return res.status(422).json({ message: "Las contraseñas no coinciden." });
  }
  // Verificar si el usuario existe

  const userExist = await User.findOne({ email: email });
  if (userExist) {
    return res
      .status(422)
      .json({ message: "Favor utilizar otro correo eletronico!" });
  }

  // crear password

  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  // create user
  const user = new User({
    userName,
    email,
    password: passwordHash,
  });
  try {
    await user.save();
    res.status(201).json({ message: "El usuario fue creado con exito!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
//----------------------------------------(Login)------------------------------------------------------------------------

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({
      message: "El correo electrónico y la contraseña son obligatorios.",
    });
  }
  // Verificar si el usuario existe
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado!" });
  }

  // Checar si el usuario la contraseña conferen

  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) {
    return res.status(422).json({ message: "Credenciales inválidas" });
  }
  // Gerar token
  try {
    const token = generateToken(user._id);
    console.log("Token gerado:", token);
    res
      .status(200)
      .json({ message: "Autentificación realizada con éxito", token });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

//----------------------------------------(Get All Users)------------------------------------------------------------------------

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find().select("-password"); // para que no aparezca la contraseña
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(404).json({
      error: "Error al buscar usuarios",
      message:
        "Se produjo un error al buscar todos los usuarios. Detalles del error: " +
        error.message,
    });
  }
};
//----------------------------------------(Get by ID User)------------------------------------------------------------------------
const getByIdUser = async (req, res) => {
  try {
    const { id } = req.params;
    const getById = await User.findById(id, "-password");
    res.status(200).json(getById);
  } catch (error) {
    res.status(404).json({
      error: "Error al buscar usuario",
      message:
        "Se produjo un error al buscar el usuario. Detalles del error: " +
        error.message,
    });
  }
};

//----------------------------------------(Exportaciones)------------------------------------------------------------------------

module.exports = { getAllUsers, getByIdUser, RegisterUser, login };
