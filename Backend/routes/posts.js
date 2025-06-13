const express = require("express");
const postsRouter = express.Router();
const postsController = require("../controller/posts");
const {
  postBodyValidation,
  postPatchBodyValidation,
  postBodyValidator,
} = require("../middlewares/validatePostBody");
const {
  internalUpload,
  cloudCoverUpload,
} = require("../middlewares/multer/index");

postsRouter.get("/blogPosts", postsController.findAll);
postsRouter.get("/blogPosts/:id", postsController.findOne);
postsRouter.post(
  "/blogPosts",
  [postBodyValidation, postBodyValidator],
  postsController.createPost
);
postsRouter.patch(
  "/blogPosts/:id",
  [postPatchBodyValidation, postBodyValidator],
  postsController.updatePost
);
postsRouter.patch(
  "/blogPosts/:id/cover",
  cloudCoverUpload.single("cover"),
  postsController.uploadFileOnCloudinary
);
postsRouter.delete("/blogPosts/:id", postsController.deletePost);

module.exports = postsRouter;
