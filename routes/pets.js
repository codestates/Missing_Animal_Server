// const { Router } = require("express");

const express = require("express");
const petsController = require("../controller");
const { upload } = require("./multer");
const passport = require("passport");

const router = express.Router();

router.get("/petslist", petsController.pets.petslist);
router.get("/detail/:id", petsController.pets.detail);
router.post(
  "/register",
  passport.authenticate("jwt", { session: false }),
  upload.array("img"),
  petsController.pets.register
);
router.put("/edit", petsController.pets.edit);
router.delete("/remove/:id", petsController.pets.remove);
router.get("/search", petsController.pets.search);

module.exports = router;
