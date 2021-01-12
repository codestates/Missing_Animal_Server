const express = require("express");
const mapinfoController = require("../controller");
const router = express.Router();

router.get("/", mapinfoController.mapinfo);

module.exports = router;
