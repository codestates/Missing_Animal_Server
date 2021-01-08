// const { Router } = require("express");

const express = require("express");
const authController = require("../controller");
const router = express.Router();

router.post("/signup", authController.auth.signup);
router.post("/signout", authController.auth.signout);
router.post("/signin", authController.auth.signin);
router.post("/kakao", authController.auth.kakao);
router.post("/naver", authController.auth.naver);

module.exports = router;
