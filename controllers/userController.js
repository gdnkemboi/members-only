const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

exports.logInGET = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: LogIn GET");
});

exports.logInPOST = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Log In POST");
});

exports.signUpGET = asyncHandler(async (req, res, next) => {
  res.render("signup", { title: "Sign Up" });
});

// Custom email validator function
const emailValidator = (value) => {
  // Regular expression for basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(value)) {
    throw new Error("Invalid email format");
  }

  return true;
};

const confirmPassword = (value, { req }) => {
  return value === req.body.password;
};

exports.signUpPOST = [
  body("name").trim().notEmpty().withMessage("Name cannot be empty").escape(),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email cannot be empty")
    .custom(emailValidator)
    .withMessage("Please enter a valid email")
    .escape(),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 6 characters long")
    .escape(),
  body("passwordConfirmation")
    .trim()
    .notEmpty()
    .withMessage("Password confirmation cannot be empty")
    .custom(confirmPassword)
    .withMessage("Please enter the same password twice")
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      res.render("signup", {
        title: "Sign Up",
        user,
        passwordConfirmation: req.body.passwordConfirmation,
        errors: errors.array(),
      });
      return;
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });
      await user.save();
      res.redirect("/");
    }
  }),
];

exports.logOut = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Log Out");
});

exports.account = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Account");
});

exports.accountEditGET = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Account edit GET");
});

exports.accountEditPOST = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMNTED: Account edit POST");
});

exports.accountDeleteGET = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Account delete GET");
});

exports.accountDeletePOST = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMNTED: Account delete POST");
});
