// const { Router } = require("express");

const express = require("express");
const authController = require("../controller");
const router = express.Router();

const passport = require("passport");

router.post("/signup", authController.auth.signup);
router.post("/signout", authController.auth.signout);
router.post("/signin", authController.auth.signin);
router.post("/kakao", authController.auth.kakao);
router.post("/naver", authController.auth.naver);

// router.get(
//   "/get",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     res.json({
//       message: "auth OK",
//     });
//   }
// );

module.exports = router;
