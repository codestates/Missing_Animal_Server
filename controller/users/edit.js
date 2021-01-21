const { Users } = require("../../models");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = async (req, res) => {
  const { username, email, mobile, oldpassword, newpassword } = req.body;

  // DB에 담긴 비밀번호 확인
  const dbPass = await Users.findOne({
    where: { id: req.params.id },
    attributes: ["password"],
  });

  // 기존 비밀번호와 DB에 담긴 비밀번호 비교
  const isMatch = await bcrypt.compare(oldpassword, dbPass.password);

  // 기존 비밀번호, DB 비밀번호 일치
  if (isMatch) {
    if (newpassword) {
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(newpassword, salt);

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
    // 기존 비밀번호, DB 비밀번호 불일치
  } else {
    res.status(401).json({ message: "invaild password" });
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

// if (password) {
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
// } else if (username || email || mobile) {
//   const updateUser = await Users.update(
//     {
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
//   if (!updateUser) {
//     res.status(401).json({ message: "edit NO" });
//   } else {
//     res.status(201).json({ message: "edit OK" });
//   }
// }
