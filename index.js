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
    methods: "GET,PUT,POST",
    credentials: true,
  })
);

app.use(
  session({
    secret: "@nimal",
    resave: false,
    saveUninitialized: true,
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
