const { Pets } = require("../../models");
const pets = require("../../models/pets");

module.exports = async (req, res) => {
  const petsData = await Pets.findAll({
    attributes: ["id", "thumbnail", "title", "petname", "description"],
    order: [["createdAt", "DESC"]],
  });

  const petslist = [];
  for (let i = 0; i < petsData.length; i += 1) {
    const onePet = {
      petsId: petsData[i].id,
      thumbnail: petsData[i].thumbnail,
      title: petsData[i].title,
      petname: petsData[i].petname,
      description: petsData[i].description,
    };
    petslist.push(onePet);
  }

  res.status(200).json({ petslist });
};
