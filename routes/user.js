const express = require("express");
const {
  signUpValidator
} = require("../middlewares/validators/signUpValidator");

const {
  signInValidator,changePassword
} = require("../middlewares/validators/signInValidator");

const { authentication } = require("../middlewares/Auth/authentication");

const {
  createUser,
  getDetailUser,
  deleteUser,
  updateUser,
  login,
  updatePassword,
} = require("../controllers/user");


const router = express.Router();

router.post("/signup", signUpValidator, createUser);

router.post("/login", signInValidator, login);

router.get("/", authentication, getDetailUser);
router.put("/", authentication, updateUser);
router.put("/changepassword",authentication,changePassword,updatePassword)
router.delete("/", authentication, deleteUser);


module.exports = router;
