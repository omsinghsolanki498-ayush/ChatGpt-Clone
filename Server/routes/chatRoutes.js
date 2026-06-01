const express = require("express");  // import express

const router = express.Router();

const protection = require("../Middleware/ProtectedMiddleware");

const { sendMessage , getchats , deletechat} = require("../Controller/ChatController"); //

router.post("/send", protection, sendMessage);
router.get("/getchats",protection,getchats);
router.delete("/delete/:id",protection,deletechat);


module.exports = router;