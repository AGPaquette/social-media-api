const express = require("express");
const router = express.Router();
const commentController = require("../../controllers/CommentController");

//routes for comments and reactions
router.get("/comments", commentController.getAllComments);
router.get("/comments/:id", commentController.getCommentById);
router.post("/users/:userId/comments", commentController.createComment);
router.post("/comments/:commentID/reactions", commentController.addReaction);
router.put("/comments/:id", commentController.updateComment);
router.delete("/comments/:id", commentController.deleteComment);
router.delete(
  "/comments/:commentID/reactions/:reactionId",
  commentController.removeReaction
);

module.exports = router;