// const { Router } = require("express");

const express = require("express");
const usersController = require("../controller");
const router = express.Router();

router.get("/myinfo", usersController.users.myinfo);
router.put("/:id/edit", usersController.users.edit);

module.exports = router;
