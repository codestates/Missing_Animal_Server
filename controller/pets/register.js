const { Pets, PetsImages } = require("../../models");

module.exports = async (req, res) => {
  const { id } = req.user;
  const {
    title,
    petname,
    area,
    sex,
    missingDate,
    description,
    species,
    reward,
  } = req.body;

  const register = await Pets.create({
    title,
    petname,
    area,
    sex,
    missingDate,
    description,
    species,
    reward,
    thumbnail: req.files[0].path,
    userId: id,
  });

  const imageRegister = req.files.reduce((acc, file) => {
    const fileObj = {
      imagePath: file.path,
      petId: register.id,
    };
    acc.push(fileObj);
    return acc;
  }, []);

  await PetsImages.bulkCreate(imageRegister);

  res.status(201).json({ redirectUrl: `pets/detail/${register.id}` });
};
