const { Users, Pets, PetsImages } = require("../../models");

module.exports = async (req, res) => {
  const { id } = req.user;

  const myinfo = await Users.findOne({ where: { id } });
  const myPetInfo = await Pets.findAll({
    where: { userId: id },
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
      "latitude",
      "longitude",
      "createdAt",
    ],
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: PetsImages,
        attributes: ["imagePath"],
      },
    ],
  });

  // console.log(myPetInfo);

  let petslist = [];
  if (myPetInfo.length) {
    for (let i = 0; i < myPetInfo.length; i += 1) {
      const imageArr = [];
      for (let j = 0; j < myPetInfo[i].petsImages.length; j += 1) {
        const imagePath = {
          imagePath: myPetInfo[i].petsImages[j].imagePath,
        };
        imageArr.push(imagePath);
      }

      const oneObj = {
        id: myPetInfo[i].id,
        title: myPetInfo[i].title,
        petname: myPetInfo[i].petname,
        area: myPetInfo[i].area,
        sex: myPetInfo[i].sex,
        missingDate: myPetInfo[i].missingDate,
        description: myPetInfo[i].description,
        species: myPetInfo[i].species,
        reward: myPetInfo[i].reward,
        latitude: myPetInfo[i].latitude,
        longitude: myPetInfo[i].longitude,
        createdAt: myPetInfo[i].createdAt,
        petsImages: imageArr,
      };
      petslist.push(oneObj);
    }
  }

  const data = {
    userId: myinfo.id,
    username: myinfo.username,
    email: myinfo.email,
    mobile: myinfo.mobile,
    createdAt: myinfo.createdAt,
    petslist,
  };

  res.status(200).json(data);
};
