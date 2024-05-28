var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");

router.get("/signup", userController.signUpGET);

router.post("/signup", userController.signUpPOST);

router.get("/login", userController.logInGET);

router.post("/login", userController.logInPOST);

router.get("/logout", userController.logOut);

router.get("/account", userController.account);

router.get("/account/edit", userController.accountEditGET);

router.post("/account/edit", userController.accountEditPOST);

router.get("/account/delete", userController.accountDeleteGET);

router.post("/account/delete", userController.accountDeletePOST);

module.exports = router;
