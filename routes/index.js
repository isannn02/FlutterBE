const express = require("express");
const router = express.Router();


const user = require("./user");
const comment = require("./comment");
const event = require("./event");


router.use("/user", user);
router.use("/comment",comment)
router.use("/event",event)


module.exports = router;
