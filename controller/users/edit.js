const { Users } = require("../../models");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = async (req, res) => {
  const { username, email, password, mobile } = req.body;

  if (password) {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    const updatePW = await Users.update(
      {
        password: hash,
        username: username,
        email: email,
        mobile: mobile,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    // 정보 변경 X
    if (!updatePW) {
      res.status(401).json({ message: "edit NO" });
    } else {
      res.status(201).json({ message: "edit OK" });
    }
  } else if (username || email || mobile) {
    const updateUser = await Users.update(
      {
        username: username,
        email: email,
        mobile: mobile,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!updateUser) {
      res.status(401).json({ message: "edit NO" });
    } else {
      res.status(201).json({ message: "edit OK" });
    }
  }
};

// module.exports = async (req, res) => {
//   const { username, email, password, mobile } = req.body;

//   const salt = await bcrypt.genSalt(saltRounds);
//   const hash = await bcrypt.hash(password, salt);

//   const updatePW = await Users.update(
//     {
//       password: hash,
//       username: username,
//       email: email,
//       mobile: mobile,
//     },
//     {
//       where: {
//         id: req.params.id,
//       },
//     }
//   );

//   // 정보 변경 X
//   if (!updatePW) {
//     res.status(401).json({ message: "edit NO" });
//   } else {
//     res.status(201).json({ message: "edit OK" });
//   }
// };
