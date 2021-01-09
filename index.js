require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const app = express();
const cookieParser = require("cookie-parser");

const { sequelize } = require("./models");
sequelize.sync();

const port = 8080;

app.use(
  cors({
    origin: "http://localhost:3000",
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

app.listen(port, () => {
  console.log("server on " + port);
});
