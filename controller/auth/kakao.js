const axios = require("axios");

module.exports = (req, res) => {
  res.status(201).json({ message: "kakao login" });
};
