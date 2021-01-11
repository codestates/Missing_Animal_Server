const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const app = express();
const logger = require("morgan");
const passport = require("passport");
const { sequelize } = require("./models");
sequelize.sync();

const passportConfig = require("./config/JWTStrategy");

const port = 8080;

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(logger("dev")); //deploy : "combine" (monitor 하기 위함)

passportConfig(passport);

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(
  session({
    secret: "@nimal",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

// router
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");
const petsRouter = require("./routes/pets");
const mapinfoRouter = require("./routes/mapinfo");
const commentsRouter = require("./routes/comments");

app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/pets", petsRouter);
app.use("/mapinfo", mapinfoRouter);
app.use("/comments", commentsRouter);

// test
app.get("/", (req, res) => {
  res.send("HELLO WORLD");
});

app.listen(port, () => {
  console.log("server on " + port);
});
