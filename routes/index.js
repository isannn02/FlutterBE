const express = require("express");
const router = express.Router();


const user = require("./user");
const comment = require("./comment");
const event = require("./event");
const contact = require("./contact");
const nutrition = require("./nutrition");


router.use("/user", user);
router.use("/comment",comment)
router.use("/event",event)
router.use("/contact",contact)
router.use("/nutrition",nutrition)


module.exports = router;
