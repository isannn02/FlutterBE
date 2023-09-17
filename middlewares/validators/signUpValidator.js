const path = require("path");
const validator = require("validator");
const { user } = require("../../models");

exports.signUpValidator = async (req, res, next) => {
  try {
    const errors = [];

    if (validator.isEmpty(req.body.name)) {
      errors.push("Silahkan isi nama");
    }
    if (validator.isEmpty(req.body.user_name)) {
      errors.push("Silahkan isi User Name ");
    }
    const checkUserName = await user.findOne({
      where: {
        user_name: req.body.user_name,
      },
    });

    if (checkUserName != null) {
      errors.push("Tidak dapat mendaftar user name sudah ada");
    }
    // if (validator.isEmpty(req.body.last_name)) {
    //   errors.push("Please input your last name");
    // }
    if (!validator.isEmail(req.body.email)) {
      errors.push("Email tidak boleh kosong");
    }

    const checkEmail = await user.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (checkEmail != null) {
      errors.push("Email sudah terdaftar");
    }

    if (!validator.isStrongPassword(req.body.password)) {
      errors.push(
        "Password harus 8 karakter terdiri minimal 1 hurup besar, 1 angka dan 1 simbol karakter"
      );
    }
    

    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors: errors });
    }

    next();
  } catch (error) {
    console.log(error, "ini errornya");
    res.status(401).json({ success: false, errors: ["Masukan Data diri yang sesuai"] });
  }
};
