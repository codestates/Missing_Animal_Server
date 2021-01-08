const axios = require("axios");

module.exports = (req, res) => {
  res.status(200).json({
    title: "title",
    petname: "petname",
    area: "area",
    sex: "sex",
    missingDate: "missingDate",
    description: "description",
    species: "species",
    reward: "reward",
    images: ["images", "images"],
    createdAt: "createdAt",
  });
};
