const express = require("express");
const authorsRoute = express.Router();
const authorsController = require("../controller/authors");
const {
  authorBodyValidation,
  authorBodyPatchValidation,
  authorBodyValidator,
} = require("../middlewares/validateAuthorBody");
const { cloudAuthorAvatarUpload } = require("../middlewares/multer/index");

authorsRoute.get("/authors", authorsController.findAll);
authorsRoute.post(
  "/authors",
  [authorBodyValidation, authorBodyValidator],
  authorsController.createAuthor
);
authorsRoute.patch(
  "/authors/:id",
  [authorBodyPatchValidation, authorBodyValidator],
  authorsController.updateAuthor
);
authorsRoute.delete("/authors/:id", authorsController.deleteAuthor);

authorsRoute.patch(
  "/authors/:id/avatar",
  cloudAuthorAvatarUpload.single("avatar"),
  authorsController.uploadAuthorAvatar
);

module.exports = authorsRoute;
