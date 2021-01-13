const { Pets, PetsImages } = require("../../models");
const fs = require("fs");
const path = require("path");

module.exports = async (req, res) => {
  const findImages = await PetsImages.findAll({
    where: { petId: req.params.id },
    attributes: ["imagePath"],
  });

  for (let i = 0; i < findImages.length; i += 1) {
    if (findImages[i].imagePath.includes("uploads")) {
      fs.unlink(
        path.join(__dirname, "../..", findImages[i].imagePath),
        (err) => {
          if (err) throw err;
        }
      );
    }
  }

  await Pets.destroy({ where: { id: req.params.id }, force: true });
  await PetsImages.destroy({ where: { petId: req.params.id }, force: true });

  res.status(200).json({ message: "remove OK" });

  // console.log(__dirname); --> /Users/mac/Desktop/missing-animals/Missing_Animal_Server/controller/pets
};
