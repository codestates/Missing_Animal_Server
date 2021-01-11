const axios = require("axios");

module.exports = (req, res) => {
  console.log("users:", req.user);
  res.status(201).json({
    userId: "userId",
    username: "username",
    email: "email",
    mobile: "mobile",
    petsId: ["petsId", "petsId"],
    createdAt: "createdAt",
  });
};
