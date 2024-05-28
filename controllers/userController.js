const User = require("../models/user");
const asyncHandler = require("express-async-handler");

exports.logInGET = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: LogIn GET");
});

exports.logInPOST = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Log In POST");
});

exports.signUpGET = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Sign Up GET");
});

exports.signUpPOST = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Sign Up POST");
});

exports.logOut = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Log Out");
});

exports.account = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Account")
})

exports.accountEditGET = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Account edit GET")
})

exports.accountEditPOST = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMNTED: Account edit POST")
})

exports.accountDeleteGET = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Account delete GET")
})

exports.accountDeletePOST = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMNTED: Account delete POST")
})