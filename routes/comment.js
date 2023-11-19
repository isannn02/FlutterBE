const express = require("express");


const { authentication } = require("../middlewares/Auth/authentication");
const {
    createComment,
    getAllComments

  } = require("../controllers/comment");
  const forgetPasswordController=require('../controllers/forgetpassword')


const router = express.Router();

router.get("/all",authentication, getAllComments);
router.post("/create",authentication, createComment);










module.exports = router;