const { Users } = require("../../models");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = async (req, res) => {
  const { username, password, email, mobile } = req.body;

  if (!username || !password || !email || !mobile) {
    return res.status(400).json({ message: "failed" });
  }

  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);

  const signup = await Users.findOrCreate({
    where: { email },
    defaults: { username, password: hash, mobile },
  });

  const [users] = signup;

  if (users.username !== username) {
    res.status(400).json({ message: "already registered user" });
  } else {
    res.status(201).json({ message: "signup" });
  }
};
