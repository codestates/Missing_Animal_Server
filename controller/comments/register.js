const { Comments } = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  const { text, nick, password, petId } = req.body;

  // petId가 안넘어오면 failed
  if (!petId) {
    res.status(400).json({ message: "required petId" });
  } else {
    // 비회원
    if (nick && password && text) {
      await Comments.create({
        image: req.files[0].location,
        text,
        nick,
        password,
        userId: "0", // id:0 비회원
        petId,
      });

      res.status(201).json({
        message: "register Ok",
      });
    }
    // 회원
    else {
      const token = req.headers.authorization.replace("Bearer ", "");
      const tokenDecoded = jwt.decode(token, process.env.JWT_SECRET);

      // console.log("tokenDecoded:", tokenDecoded);

      if (!tokenDecoded.id) {
        res.status(400).json({ message: "required userId" });
      } else {
        await Comments.create({
          image: req.files[0].location,
          text,
          nick: tokenDecoded.username,
          password: null,
          userId: tokenDecoded.id,
          petId,
        });
        res.status(201).json({
          message: "register Ok",
        });
      }
    }
  }
};
