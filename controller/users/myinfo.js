const { Users, Pets, PetsImages } = require("../../models");

module.exports = async (req, res) => {
  const { id } = req.user;

  const userinfo = await Pets.findAll({
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
      {
        model: Users,
        attributes: ["id", "username", "email", "mobile", "createdAt"],
      },
    ],
  });

  // console.log(userinfo[0].petsImages);

  const petslist = [];
  for (let i = 0; i < userinfo.length; i += 1) {
    const imageArr = [];
    for (let j = 0; j < userinfo[i].petsImages.length; j += 1) {
      const imagePath = {
        imagePath: userinfo[i].petsImages[j].imagePath,
      };
      imageArr.push(imagePath);
    }

    const oneObj = {
      id: userinfo[i].id,
      title: userinfo[i].title,
      petname: userinfo[i].petname,
      area: userinfo[i].area,
      sex: userinfo[i].sex,
      missingDate: userinfo[i].missingDate,
      description: userinfo[i].description,
      species: userinfo[i].species,
      reward: userinfo[i].reward,
      latitude: userinfo[i].latitude,
      longitude: userinfo[i].longitude,
      createdAt: userinfo[i].createdAt,
      petsImages: imageArr,
    };
    petslist.push(oneObj);
  }

  const data = {
    userId: userinfo[0].user.id,
    username: userinfo[0].user.username,
    email: userinfo[0].user.email,
    mobile: userinfo[0].user.mobile,
    createdAt: userinfo[0].user.createdAt,
    petslist,
  };

  res.status(200).json(data);
};
