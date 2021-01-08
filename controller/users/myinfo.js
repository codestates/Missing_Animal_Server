const axios = require("axios");

module.exports = (req, res) => {
  res.status(201).json({
    userId: "userId",
    username: "username",
    email: "email",
    mobile: "mobile",
    petsId: ["petsId", "petsId"],
    createdAt: "createdAt",
  });
};
