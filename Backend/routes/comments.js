const express = require("express");
const commentsRouter = express.Router();
const commentController = require("../controller/comments");
const {
  commentBodyValidation,
  commentBodyPatchValidation,
  commentBodyValidator,
} = require("../middlewares/validateCommentBody");

commentsRouter.get("/blogPosts/:id/comments", commentController.findAll);
commentsRouter.get(
  "/blogPosts/:id/comments/:commentId",
  commentController.findSingleComment
);
commentsRouter.post(
  "/blogPosts/:id",
  [commentBodyValidation, commentBodyValidator],
  commentController.createComment
);
commentsRouter.patch(
  "/blogPosts/:id/comment/:commentId",
  [commentBodyPatchValidation, commentBodyValidator],
  commentController.updateSingleComment
);

commentsRouter.delete(
  "/blogPosts/:id/comment/:commentId",
  commentController.deleteComment
);

module.exports = commentsRouter;
