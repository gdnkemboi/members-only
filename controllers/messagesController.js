const Message = require("../models/message");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.addMessageGET = asyncHandler(async (req, res, next) => {
  res.render("message_form", { title: "Add new message" });
});

exports.addMessagePOST = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title cannot be emepty")
    .isLength({ min: 3 })
    .withMessage("Title is too short")
    .isLength({ max: 128 })
    .withMessage("Title is too long")
    .escape(),
  body("body").trim().notEmpty().withMessage("Body cannot be empty").escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const message = new Message({
      title: req.body.title,
      body: req.body.body,
      author: req.user,
    });

    if (!errors.isEmpty()) {
      res.render("message_form", {
        title: "Add new message",
        message,
        errors: errors.array(),
      });
    } else {
      await message.save();
      res.redirect("/");
    }
  }),
];
