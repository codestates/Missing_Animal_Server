const axios = require("axios");

module.exports = (req, res) => {
  res.status(201).json({
    comment: {
      commentId: "commentId",
      username: "username",
      text: "text",
      createdAt: "createdAt",
    },
  });
};
