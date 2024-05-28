var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");

router.get("/sign_up", userController.signUpGET);

router.post("/sign_up", userController.signUpPOST);

router.get("/log_in", userController.logInGET);

router.post("/log_in", userController.logInPOST);

router.get("/logout", userController.logOut);

router.get("/account", userController.account);

router.get("/account/edit", userController.accountEditGET);

router.post("/account/edit", userController.accountEditPOST);

router.get("/account/delete", userController.accountDeleteGET);

router.post("/account/delete", userController.accountDeletePOST);

module.exports = router;
