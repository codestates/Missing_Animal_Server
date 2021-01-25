require("dotenv").config();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { Users } = require("../../models");

module.exports = async (req, res) => {
  const { email, password } = req.body;

  // 이메일 확인
  const users = await Users.findOne({
    where: { email },
  });

  if (!users) {
    return res.status(400).json({ message: "invalid email" });
  } else {
    // 비밀번호 확인
    const isMatch = await bcrypt.compare(password, users.password);
    if (isMatch) {
      const token = jwt.sign(
        {
          id: users.id,
          email: users.email,
          username: users.username,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );
      return res.status(200).cookie("token", token).json({ token });
    } else {
      return res.status(400).json({ message: "invalid password" });
    }
  }
};
