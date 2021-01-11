// const { Router } = require("express");

const passport = require("passport");

const express = require("express");
const usersController = require("../controller");
const router = express.Router();

router.get(
  "/myinfo",
  passport.authenticate("jwt", { session: false }),
  usersController.users.myinfo
);
router.put("/:id/edit", usersController.users.edit);

module.exports = router;
