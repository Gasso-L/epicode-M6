//Body validator with Express Validator
const { body, validationResult } = require("express-validator");

const authorBodyValidation = [
  body("firstName")
    .notEmpty()
    .isString()
    .isLength({ min: 2, max: 100 })
    .withMessage(
      "First Name is not a valid string. Max 100 char and min 2 char"
    ),
  body("lastName")
    .notEmpty()
    .isString()
    .isLength({ min: 2, max: 100 })
    .withMessage(
      "Last Name is not a valid string. Max 100 char and min 2 char"
    ),
  body("email")
    .notEmpty()
    .isEmail()
    .withMessage("Email must be a valid email address"),
  body("dob").notEmpty().isDate().withMessage("Date Of Birth must be a date"),
  body("avatar")
    .optional()
    .isString()
    .withMessage("Avatar must be a valid url path"),
];

const authorBodyPatchValidation = [
  body("firstName")
    .optional()
    .isString()
    .isLength({ min: 2, max: 100 })
    .withMessage(
      "First Name is not a valid string. Max 100 char and min 2 char"
    ),
  body("lastName")
    .optional()
    .isString()
    .isLength({ min: 2, max: 100 })
    .withMessage(
      "Last Name is not a valid string. Max 100 char and min 2 char"
    ),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Email must be a valid email address"),
  body("dob").optional().isDate().withMessage("Date Of Birth must be a date"),
  body("avatar")
    .optional()
    .isString()
    .isLength({ max: 255 })
    .withMessage("Avatar must be a valid url path"),
];

const authorBodyValidator = (req, res, next) => {
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
  authorBodyValidation,
  authorBodyPatchValidation,
  authorBodyValidator,
};
