const express = require("express");
const router = express.Router();


const user = require("./user");
const comment = require("./comment");


router.use("/user", user);
router.use("/comment",comment)


module.exports = router;
