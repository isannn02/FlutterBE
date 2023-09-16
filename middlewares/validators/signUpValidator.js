const path = require("path");
const validator = require("validator");
const { user } = require("../../models");

exports.signUpValidator = async (req, res, next) => {
  try {
    const errors = [];

    if (validator.isEmpty(req.body.name)) {
      errors.push("Please input your first name");
    }
    if (validator.isEmpty(req.body.user_name)) {
      errors.push("Please input your user name ");
    }
    const checkUserName = await user.findOne({
      where: {
        email: req.body.user_name,
      },
    });

    // if (checkUserName != null) {
    //   errors.push("Cannot register, user name was registered");
    // }
    // if (validator.isEmpty(req.body.last_name)) {
    //   errors.push("Please input your last name");
    // }
    if (!validator.isEmail(req.body.email)) {
      errors.push("Email cannot be empty");
    }

    const checkEmail = await user.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (checkEmail != null) {
      errors.push("Cannot register, email was registered");
    }

    if (!validator.isStrongPassword(req.body.password)) {
      errors.push(
        "Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, and 1 number"
      );
    }
    

    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors: errors });
    }

    next();
  } catch (error) {
    console.log(error, "ini errornya");
    res.status(401).json({ success: false, errors: ["Bad request"] });
  }
};
