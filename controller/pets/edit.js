const { Pets, PetsImages } = require("../../models");

module.exports = async (req, res) => {
  const { id } = req.user;

  const {
    title,
    petname,
    missingDate,
    description,
    species,
    reward,
  } = req.body;

  Pets.update(
    {
      title,
      petname,
      missingDate,
      description,
      species,
      reward,
    },
    {
      where: {
        userid: id,
      },
    }
  );

  const updatePet = await Pets.findOne({
    where: { userid: id },
  });

  // 데이터베이스에 이미지 삭제
  // await PetsImages.destroy({
  //   where: { petId: updatePet.id },
  // });

  // console.log("petId:", updatePet.id);

  // req.files 이미지 배열로
  // const getImg = await req.files.map((obj) => obj.path);
  // console.log("getImg:", getImg);
  // console.log("getImg:", getImg.length);

  const imageRegister = req.files.reduce((acc, file) => {
    const fileObj = {
      imagePath: file.path,
      petId: updatePet.id,
    };
    acc.push(fileObj);
    return acc;
  }, []);

  // console.log("imageRegister:", imageRegister.length);

  const checkPetImg = await PetsImages.findAll({
    where: { petId: updatePet.id },
  });

  // console.log("checkPetImg:", checkPetImg.length);

  // 올리려는 이미지 개수에 따라 다르게 처리
  if (imageRegister.length === 3) {
    await PetsImages.destroy({
      where: { petId: updatePet.id },
    });
    await PetsImages.bulkCreate(imageRegister);
    return res.status(201).json({ message: "edit OK" });
  }
  if (imageRegister.length === 2 && checkPetImg.length === 3) {
    await PetsImages.destroy({
      where: { petId: updatePet.id },
      limit: 2,
    });
    await PetsImages.bulkCreate(imageRegister);
    return res.status(201).json({ message: "edit OK" });
  }
  if (imageRegister.length === 2 && checkPetImg.length === 2) {
    await PetsImages.destroy({
      where: { petId: updatePet.id },
      limit: 1,
    });
    await PetsImages.bulkCreate(imageRegister);
    return res.status(201).json({ message: "edit OK" });
  }
  if (imageRegister.length === 1 && checkPetImg.length === 3) {
    await PetsImages.destroy({
      where: { petId: updatePet.id },
      limit: 1,
    });
    await PetsImages.bulkCreate(imageRegister);
    return res.status(201).json({ message: "edit OK" });
  } else {
    await PetsImages.bulkCreate(imageRegister);
    res.status(201).json({ message: "edit OK" });
  }
};
