// require("dotenv").config();

// const passport = require("passport");
// const LocalStrategy = require("passport-local").Strategy;

// const { Users } = require("../models");

// module.exports = () => {
//   const LocalStrategyOption = {
//     usernameField: "email",
//     passwordField: "password",
//   };

//   const passportVerify = (email, password, done) => {
//     Users.findOne({
//       where: { email, password },
//     })
//       .then((user) => {
//         if (!user) {
//           return done(null, false, {
//             message: "Incorrect email or password.",
//           });
//         }
//         return done(null, user, { message: "Logged In Successfully" });
//       })
//       .catch((err) => done(err));
//   };

//   passport.use(new LocalStrategy(LocalStrategyOption, passportVerify));
// };
