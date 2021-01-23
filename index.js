require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");
const { sequelize } = require("./models");
const passportConfig = require("./config/JWTStrategy");

const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");
const petsRouter = require("./routes/pets");
const mapinfoRouter = require("./routes/mapinfo");
const commentsRouter = require("./routes/comments");

const app = express();
sequelize.sync();
passportConfig(passport);

app.set("port", process.env.PORT || 8080);

app.use(logger("combined"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: "https://missinganimal.ml",
    methods: ["OPTIONS", "GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/pets", petsRouter);
app.use("/mapinfo", mapinfoRouter);
app.use("/comments", commentsRouter);

app.listen(app.get("port"));
