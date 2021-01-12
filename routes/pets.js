// const { Router } = require("express");

const express = require("express");
const petsController = require("../controller");
const router = express.Router();

router.get("/petslist", petsController.pets.petslist);
router.get("/detail/:petsid", petsController.pets.detail);
router.post("/register", petsController.pets.register);
router.put("/edit", petsController.pets.edit);
router.delete("/remove/:id", petsController.pets.remove);
router.get("/search", petsController.pets.search);

module.exports = router;
