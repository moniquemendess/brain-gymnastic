//-------------------------------------(Importaciones)-------------------------------------------------------------
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const session = require("express-session"); // Agregar express-session

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");

const cors = require("cors");
const { connect } = require("./src/utils/db");
const User = require("./src/api/models/User.model.js");

//------------------------(Criación de servidor Express y configuración del middleware session )----------------------

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

//-------------------------------------(Inicializar passport y session)---------------------------------------------

app.use(passport.initialize());
app.use(passport.session());

//--------------------------------(Configurar dotenv para poder utilizar las variables de entorno del .env)-------

dotenv.config();

//--------------------------------(Creamos la conexión con la BD (base de datos))---------------------------------

connect();

//---------------------------------(Permite solicitudes desde cualquier origen)------------------------------------

app.use(cors());

//---------------------------------(Configuración autenticación de Google)------------------------------------------

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:8080/auth/google/crear", // cuando el user esta autenticado se va p/ esta url
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate(
        {
          username: profile.displayName,
          googleId: profile.id,
        },
        function (err, user) {
          return cb(err, user);
        }
      );
    }
  )
);

//----------------(Serializar y deserializar usuarios (necesario para passport.authenticate (no modificar))------------

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});
//---------------------------------------(Llave secreta token jwt)--------------------------------------------------

const secretOrKey = process.env.SECRET_OR_KEY;

//----------------------------------------(Rutas Login Google)--------------------------------------------------------

// Ejemplo: http://localhost:8080/auth/google

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    // Dados do usuário autenticado retornado pelo Google
    const user = req.user;

    // Gerar o token JWT
    const token = jwt.sign(user, process.env.SECRET_OR_KEY);

    // Enviar o token JWT como resposta
    res.json({ token: token });
  }
);

app.get(
  "/auth/google/crear",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // adelante configurar para cuando hacer login navegar p/otra page (cambiar el "/secrets")
    res.redirect("/secrets");
  }
);

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
