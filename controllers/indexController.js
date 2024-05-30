const User = require("../models/user");
const Message = require("../models/message");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  const messages = await Message.find({})
    .sort({ timestamp: 1 })
    .populate("author")
    .exec();
    
  res.render("index", { title: "Members-Only", user: req.user, messages });
});
