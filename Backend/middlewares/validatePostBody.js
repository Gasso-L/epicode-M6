//Express Validator for Post Body
const { body, validationResult } = require("express-validator");

const postBodyValidation = [
  body("category")
    .notEmpty()
    .withMessage("Category is required")
    .isString()
    .withMessage("Category must be a string")
    .isLength({ min: 2, max: 20 })
    .withMessage("Category must be min 2 chars and max 20 chars"),

  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string")
    .isLength({ min: 2, max: 100 })
    .withMessage("Title must be with min 2 chars and max 100 chars"),

  body("cover").optional().isString().withMessage("Cover must be a string"),

  body("readTime.value")
    .notEmpty()
    .withMessage("Read Time value is required")
    .isNumeric()
    .withMessage("Read Time value must be a number")
    .isInt({ min: 1 })
    .withMessage("Read Time value must be at least 1"),

  body("readTime.unit")
    .notEmpty()
    .withMessage("Read Time unit is required")
    .isString()
    .withMessage("Read Time unit must be a string")
    .isIn(["minutes", "hours"])
    .withMessage("Read Time unit must be minutes or hours"),

  body("author")
    .notEmpty()
    .withMessage("Author is required")
    .isString()
    .withMessage("Author must be a String")
    .isLength({ min: 2 })
    .withMessage("Author must contain at least 2 chars"),

  body("content")
    .notEmpty()
    .withMessage("Content is required")
    .isString()
    .withMessage("Content must be a string")
    .isLength({ min: 2 })
    .withMessage("Content must contain at least 2 chars"),
];

const postPatchBodyValidation = [
  body("category")
    .optional()
    .isString()
    .withMessage("Category must be a string")
    .isLength({ min: 2, max: 20 })
    .withMessage("Category must be min 2 chars and max 20 chars"),

  body("title")
    .optional()
    .isString()
    .withMessage("Title must be a string")
    .isLength({ min: 2, max: 100 })
    .withMessage("Title must be with min 2 chars and max 100 chars"),

  body("cover")
    .optional()
    .isString()
    .withMessage("Cover must be a string")
    .isLength({ max: 255 })
    .withMessage("Cover must be a valid string with max 255 chars"),

  body("readTime.value")
    .optional()
    .isNumeric()
    .withMessage("Read Time value must be a number")
    .isInt({ min: 1 })
    .withMessage("Read Time value must be at least 1"),

  body("readTime.unit")
    .optional()
    .isString()
    .withMessage("Read Time unit must be a string")
    .isIn(["minutes", "hours"])
    .withMessage("Read Time unit must be minutes or hours"),

  body("author")
    .optional()
    .isString()
    .withMessage("Author must be a String")
    .isLength({ min: 2 })
    .withMessage("Author must contain at least 2 chars"),

  body("content")
    .optional()
    .isString()
    .withMessage("Content must be a string")
    .isLength({ min: 2 })
    .withMessage("Content must contain at least 2 chars"),
];

const postBodyValidator = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: "The request must contain at least one field to be valid",
    });
  }
  next();
};

module.exports = {
  postBodyValidation,
  postPatchBodyValidation,
  postBodyValidator,
};
