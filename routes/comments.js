const express = require("express");
const commentsController = require("../controller");
const router = express.Router();

router.get("/read/:id", commentsController.comments.read);
router.post("/register", commentsController.comments.register);
router.put("/edit", commentsController.comments.edit);
router.delete("/remove/:id", commentsController.comments.remove);

module.exports = router;
