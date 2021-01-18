const { Comments } = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  const { text, nick, password, petId } = req.body;

  const token = req.headers.authorization.replace("Bearer ", "");
  const tokenDecoded = jwt.decode(token, process.env.JWT_SECRET);

  console.log("tokenDecoded:", tokenDecoded);

  // 넘어오는 userId가 user 테이블에 있는지 확인
  // const users = await Users.findAll();
  // const userIdList = users.map((obj) => obj.dataValues.id);

  // console.log("userIdList:", userIdList);

  // 비회원 댓글
  // petId가 안넘어오면 failed
  if (!petId) {
    return res.status(400).json({ message: "required petId" });
  } else {
    if (nick && password && text) {
      await Comments.create({
        image: req.files[0].location,
        text,
        nick,
        password,
        userId: "0", // id:0 비회원
        petId,
      });

      return res.status(201).json({
        message: "register Ok",
      });
    }

    // 회원 댓글
    // userId가 안넘어오면 failed
    else if (!tokenDecoded.id) {
      return res.status(400).json({ message: "required userId" });
    } else {
      await Comments.create({
        image: req.files[0].location,
        text,
        nick: tokenDecoded.username,
        password: null,
        userId: tokenDecoded.id,
        petId,
      });
      return res.status(201).json({
        message: "register Ok",
      });
    }
  }
};
