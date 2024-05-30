const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messagesController");

router.get("/message/new", messageController.addMessageGET);

router.post("/message/new", messageController.addMessagePOST);

module.exports = router;
