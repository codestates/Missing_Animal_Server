const axios = require("axios");

module.exports = (req, res) => {
  res.status(200).json({
    comment: {
      commentId: "commentId",
      text: "text",
    },
  });
};
