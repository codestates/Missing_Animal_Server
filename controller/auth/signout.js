const axios = require("axios");

module.exports = (req, res) => {
  res.clearCookie();
  res.status(200).json({ message: "signout" });
};
