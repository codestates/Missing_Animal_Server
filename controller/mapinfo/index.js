const { Pets } = require("../../models");

module.exports = async (req, res) => {
  const petinfo = await Pets.findAll({
    attributes: [
      "id",
      "area",
      "thumbnail",
      "species",
      "reward",
      "missingDate",
      "petname",
    ],
  });

  res.status(200).json({ mapinfo: petinfo });
};
