const { Pets, PetsImages } = require("../../models");
const { s3 } = require("../../routes/multer");

module.exports = async (req, res) => {
  const { id } = req.user;

  const compareUser = await Pets.findOne({
    where: { id: req.params.id },
  });
  if (compareUser.userId !== id) {
    return res.status(400).json({ message: "not Authorized" });
  }

  const findImages = await PetsImages.findAll({
    where: { petId: req.params.id },
    attributes: ["imagePath"],
  });

  if (findImages.length) {
    const fileUrls = [];
    for (let i = 0; i < findImages.length; i += 1) {
      const fileUrl = findImages[i].imagePath.split("/");
      const delFileName = fileUrl[fileUrl.length - 1];
      fileUrls.push({ Key: delFileName });
    }

    const params = {
      Bucket: "missing-animals-images",
      Delete: { Objects: fileUrls },
    };
    s3.deleteObjects(params, (err) => {
      if (err) return next(err);
    });

    await PetsImages.destroy({ where: { petId: req.params.id }, force: true });
  }

  await Pets.destroy({ where: { id: req.params.id }, force: true });

  res.status(200).json({ message: "remove OK" });
};
