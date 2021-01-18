// const { Router } = require("express");

const express = require("express");
const petsController = require("../controller");
const { upload } = require("./multer");
const passport = require("passport");

const router = express.Router();

router.get("/petslist", petsController.pets.petslist);
router.get("/detail/:petsid", petsController.pets.detail);
router.post(
  "/register",
  passport.authenticate("jwt", { session: false }),
  upload.array("img"),
  petsController.pets.register
);
router.put(
  "/edit",
  passport.authenticate("jwt", { session: false }),
  upload.any("img"),
  petsController.pets.edit
);
router.delete(
  "/remove/:id",
  passport.authenticate("jwt", { session: false }),
  petsController.pets.remove
);
router.post("/search", petsController.pets.search);

module.exports = router;
