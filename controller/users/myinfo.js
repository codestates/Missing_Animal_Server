const axios = require("axios");
const { Users, Pets } = require("../../models");
const pets = require("../../models/pets");

module.exports = async (req, res) => {
  const { id } = req.user;

  const userinfo = await Users.findAll({
    where: { id },
    attributes: ["id", "username", "email", "mobile", "createdAt"],
    include: [
      {
        model: Pets,
        attributes: ["id"], // 추후에 추가
      },
    ],
  });

  const petsId = [];
  for (let i = 0; i < userinfo[0].pets.length; i += 1) {
    petsId.push(userinfo[0].pets[i].id);
  }

  const data = {
    userId: userinfo[0].id,
    username: userinfo[0].username,
    email: userinfo[0].email,
    mobile: userinfo[0].mobile,
    petsId,
    createdAt: userinfo[0].createdAt,
  };

  res.status(200).json(data);
};
