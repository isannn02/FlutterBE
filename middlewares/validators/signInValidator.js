const path = require("path");
const validator = require("validator");

exports.signInValidator = async (req, res, next) => {
  try {
    const errors = [];

    if (validator.isEmpty(req.body.user_name)) {
      errors.push("Silahkan isi User Name");
    }

    // if (!validator.isEmail(req.body.email)) {
    //   errors.push("Email is not valid");
    // }

    if (validator.isEmpty(req.body.password)) {
      errors.push("Silahkan isi password");
    }

    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors: errors });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, errors: ["Silahkan Isi User Name dan password"] });
  }
};
exports.changePassword = async (req, res, next) => {
  try {
    const errors = [];
    if (validator.isEmpty(req.body.password)) { errors.push("Password tidak boleh kosong"); } 
    if (validator.isEmpty(req.body.confirmPassword)) { errors.push("Confirm password tidak boleh kosong"); } 
    if (req.body.password !== req.body.confirmPassword) { errors.push("Password dan confirm Password tidak sama"); }
     if (!validator.isStrongPassword(req.body.password)) { errors.push("Password harus 8 karakter terdiri minimal 1 hurup besar, 1 angka dan 1 simbol karakter"); }
    if (errors.length > 0) { return res.status(400).json({ success: false, errors: errors }); }
    next()
  } catch (error) { res.status(500).json({ success: false, errors: ['Internal server error'] }) }
}
