const { Pets, PetsImages, Users } = require("../../models");
const pets = require("../../models/pets");

module.exports = async (req, res) => {
  const petsData = await Pets.findAll({
    attributes: [
      "id",
      "title",
      "petname",
      "area",
      "sex",
      "missingDate",
      "description",
      "species",
      "reward",
      "createdAt",
    ],
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: PetsImages,
        attributes: ["imagePath"],
      },
      {
        model: Users,
        attributes: ["id", "username", "email", "mobile"],
      },
    ],
  });

  res.status(200).json({ petslist: petsData });
};
