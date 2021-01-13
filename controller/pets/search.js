const { Pets } = require("../../models");
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
  });

  const filterList = [];
  for (let i = 0; i < filterPets.length; i += 1) {
    const filter = {
      petsId: filterPets[i].id,
      thumbnail: filterPets[i].thumbnail,
      title: filterPets[i].title,
      petname: filterPets[i].petname,
      description: filterPets[i].description,
    };
    filterList.push(filter);
  }

  res.status(200).json({ filteredList: filterList });
};
