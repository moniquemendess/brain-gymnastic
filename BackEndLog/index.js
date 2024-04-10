//-------------------------------------(Importaciones)-------------------------------------------------------------
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

// const session = require("express-session"); // Agregar express-session

// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;

const cors = require("cors");
const { connect } = require("./src/utils/db");
// const User = require("./src/api/models/User.model.js");

const files = require("./src/middleware/files.middleware.js");

//------------------------(Criación de servidor Express y configuración del middleware session )----------------------

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(
//   session({
//     secret: "keyboard cat",
//     resave: false,
//     saveUninitialized: true,
//   })
// );

// //-------------------------------------(Inicializar passport y session)---------------------------------------------

// app.use(passport.initialize());
// app.use(passport.session());

//--------------------------------(Configurar dotenv para poder utilizar las variables de entorno del .env)-------

dotenv.config();

//--------------------------------(Creamos la conexión con la BD (base de datos))---------------------------------

connect();

//---------------------------------(Configuración de Cloudinary para gestión de img)------------------------------------

files.configCloudinary();

//---------------------------------(Permite solicitudes desde cualquier origen)------------------------------------

app.use(cors());

//---------------------------------(Configuración autenticación de Google)------------------------------------------
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.CLIENT_ID,
//       clientSecret: process.env.CLIENT_SECRET,
//       callbackURL: "http://localhost:8080/auth/google/crear",
//     },
//     async function (accessToken, refreshToken, profile, cb) {
//       try {
//         // Encontre ou crie o usuário com base nos dados fornecidos pelo Google
//         let user = await User.findOne({ googleId: profile.id });

//         // Se o usuário não existir, crie um novo usuário com os dados fornecidos pelo Google
//         if (!user) {
//           user = new User({
//             username: profile.displayName,
//             googleId: profile.id,
//           });
//           await user.save();
//         }

//         // Chame a função cb com o usuário autenticado
//         cb(null, user);
//       } catch (error) {
//         cb(error, null);
//       }
//     }
//   )
// );

// //----------------(Serializar y deserializar usuarios (necesario para passport.authenticate (no modificar))------------

// passport.serializeUser(function (user, cb) {
//   process.nextTick(function () {
//     cb(null, { id: user.id });
//   });
// });

// passport.deserializeUser(function (user, cb) {
//   process.nextTick(function () {
//     return cb(null, user);
//   });
// });

//----------------------------------------(Rutas Login Google)--------------------------------------------------------

// // Ejemplo: http://localhost:8080/auth/google

// app.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google"),
//   (req, res) => {
//     // Dados do usuário autenticado retornado pelo Google
//     const user = req.user;

//     // Enviar o token JWT como resposta
//     res.json({ token: user.token });
//   }
// );

// app.get(
//   "/auth/google/crear",
//   passport.authenticate("google", { failureRedirect: "/login" }),
//   function (req, res) {
//     // adelante configurar para cuando hacer login navegar p/otra page (cambiar el "/secrets")
//     res.redirect("/secrets");
//   }
// );

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
