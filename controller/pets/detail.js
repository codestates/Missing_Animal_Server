const { Pets } = require("../../models");
const { PetsImages } = require("../../models");

module.exports = async (req, res) => {
  const petInfo = await Pets.findOne({
    where: { id: req.params.petsid },
  });

  const getImg = await PetsImages.findAll({
    where: { petId: req.params.petsid },
    attributes: ["imagePath"],
  });

  // DB에 pet Id에 맞는 정보가 있을 때
  if (petInfo) {
    res.status(200).json({
      title: petInfo.title,
      petname: petInfo.petname,
      area: petInfo.area,
      sex: petInfo.sex,
      missingDate: petInfo.missingDate,
      description: petInfo.description,
      species: petInfo.species,
      reward: petInfo.reward,
      images: getImg,
      createdAt: petInfo.createdAt,
    });
  } else {
    res.status(401).json({ message: "invaild petid" });
  }
};
