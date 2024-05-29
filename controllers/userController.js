const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const passport = require("passport");

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
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username cannot be empty")
    .escape(),
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
        username: req.body.username,
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
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });
      await user.save();
      res.redirect("/login");
    }
  }),
];

exports.logInGET = (req, res, next) => {
  res.render("login", {
    title: "Log In",
    messages: req.flash("error"),
    formData: req.session.formData || {},
  });
  delete req.session.formData; // Clear the form data after it's been used
};

exports.logInPOST = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash("error", info.message); // Assuming info contains an error message
      req.session.formData = {
        username: req.body.username,
        password: req.body.password,
      };
      return res.redirect("/login");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect("/");
    });
  })(req, res, next);
};

exports.logOut = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

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
