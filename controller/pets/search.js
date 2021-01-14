const { Pets, PetsImages, Users } = require("../../models");
const sequelize = require("sequelize");
const Op = sequelize.Op;

module.exports = async (req, res) => {
  const { search } = req.body;

  const filterPets = await Pets.findAll({
    where: {
      [Op.or]: {
        title: {
          [Op.like]: "%" + search + "%",
        },
        petname: {
          [Op.like]: "%" + search + "%",
        },
        area: {
          [Op.like]: "%" + search + "%",
        },
        sex: {
          [Op.like]: "%" + search + "%",
        },
        species: {
          [Op.like]: "%" + search + "%",
        },
        reward: {
          [Op.like]: "%" + search + "%",
        },
        description: {
          [Op.like]: "%" + search + "%",
        },
      },
    },
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

  res.status(200).json({ filteredList: filterPets });
};
