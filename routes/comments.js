const express = require("express");
const commentsController = require("../controller");
const router = express.Router();

const { upload } = require("./multerComment");

router.post(
  "/register",
  upload.array("img"),
  commentsController.comments.register
);
router.get("/read/:id", commentsController.comments.read);
router.put("/edit", commentsController.comments.edit);
router.delete("/remove/:id", commentsController.comments.remove);

module.exports = router;
