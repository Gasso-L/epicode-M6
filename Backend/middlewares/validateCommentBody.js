const { body, validationResult, param } = require("express-validator");

const commentBodyValidation = [
  body("feedback")
    .notEmpty()
    .isString()
    .isLength({ min: 3 })
    .withMessage("Feedback must be a valid string and with min three chars"),
  param("id").isMongoId().withMessage("PostId must be a valid Id"),
];

const commentBodyPatchValidation = [
  body("feedback")
    .optional()
    .isString()
    .isLength({ min: 3 })
    .withMessage("Feedback must be at least three chars"),
];

const commentBodyValidator = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      statusCode: 400,
      message: "The request must contain at least one field to be valid",
    });
  }

  next();
};

module.exports = {
  commentBodyValidation,
  commentBodyPatchValidation,
  commentBodyValidator,
};
