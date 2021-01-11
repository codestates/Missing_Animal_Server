require("dotenv").config();

const jwt = require("jsonwebtoken");
const passport = require("passport");
const bcrypt = require("bcryptjs");

const { Users } = require("../../models");

module.exports = (req, res) => {
  const { email, password } = req.body;

  // 이메일 확인
  Users.findOne({
    where: { email },
    // where: { email, password: hash },
  }).then((user) => {
    if (!user) {
      return res.status(400).json({ message: "invalid email" });
    } else {
      // 비밀번호 확인
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
            expiresIn: "7d",
          });
          // console.log("user:", user);
          return res
            .status(200)
            .cookie("token", token)
            .json({ message: "signin OK" });
        } else {
          // console.log("user:", user);
          return res.status(400).json({ message: "invalid password" });
        }
      });
    }
  });
};

// module.exports = (req, res) => {
//   passport.authenticate("local", { session: false }, (err, user) => {
//     if (err || !user) {
//       return res.status(400).json({
//         message: "Invalid User",
//       });
//     }
//     // console.log("login:", req.login);
//     req.login(user, { session: false }, (err) => {
//       if (err) {
//         res.send(err);
//       } else {
//         // console.log("user.password:", user.password);

//         // bcrypt.compare(password, user.password).then((isMatch) => {
//         //   if (isMatch) {
//         //     const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
//         //       expiresIn: "7d",
//         //     });
//         //     return res.cookie("token", token).json({ message: "signin OK" });
//         //   }
//         // });
//         const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
//           expiresIn: "7d",
//         });
//         return res.cookie("token", token).json({ message: "signin OK" });
//       }
//     });
//   })(req, res);
// };
