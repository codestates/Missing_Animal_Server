const { Pets, PetsImages } = require("../../models");
const { s3 } = require("../../routes/multer");
// const fs = require("fs");

module.exports = async (req, res) => {
  const {
    petId,
    title,
    petname,
    area,
    sex,
    missingDate,
    description,
    species,
    reward,
  } = req.body;
  const { id } = req.user;
  const imageFiles = req.files;

  const compareUser = await Pets.findOne({
    where: { userId: id },
  });
  if (compareUser.userId !== id) {
    return res.status(400).json({ message: "not Authorized" });
  }

  const findImages = await PetsImages.findAll({
    where: { petId },
    attributes: ["imagePath"],
  });

  if (req.files.length) {
    const fileUrls = [];
    for (let i = 0; i < findImages.length; i += 1) {
      if (findImages[i].imagePath) {
        const fileUrl = findImages[i].imagePath.split("/");
        const delFileName = fileUrl[fileUrl.length - 1];
        fileUrls.push({ Key: delFileName });
      }
    }

    const params = {
      Bucket: "missing-animals-images",
      Delete: { Objects: fileUrls },
    };
    s3.deleteObjects(params, (err) => {
      if (err) throw err;
    });

    const imageArray = imageFiles.reduce((acc, img) => {
      const obj = {
        petId,
        imagePath: img.location,
      };
      acc.push(obj);
      return acc;
    }, []);

    await PetsImages.destroy({ where: { petId } });
    await PetsImages.bulkCreate(imageArray);
    await Pets.update(
      { thumbnail: imageArray[0].imagePath },
      { where: { id: petId } }
    );
  }

  await Pets.update(
    {
      title,
      petname,
      area,
      sex,
      missingDate,
      description,
      species,
      reward,
    },
    { where: { id: petId } }
  );

  const updateInfo = await Pets.findOne({
    where: { id: petId },
    include: [
      { model: PetsImages, attributes: ["imagePath"], where: { petId } },
    ],
  });

  res.status(201).json(updateInfo);
};
