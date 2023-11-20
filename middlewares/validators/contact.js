const path = require("path");
const crypto = require("crypto");
const validator = require("validator");
const { promisify } = require("util");

// Make class of create or update event validatro
exports.createOrUpadateContactValidator = async (req, res, next) => {
  try {
    const errors = [];

    //   Check input of title
    if (validator.isEmpty(req.body.nama, { ignore_whitespace: false })) {
      errors.push("Silahkan Isi Nama!");
    }

    // Check for the image of event was upload or not

    if (!(req.files && req.files.photo)) {
      errors.push("Silahkan unggah gambar");
    } else if (req.files.photo) {
      // If image was uploaded

      // req.files.photoEvent is come from key (file) in postman
      const file = req.files.photo;

      // Make sure image is photo
      if (!file.mimetype.startsWith("image")) {
        errors.push("File Harus gambar");
      }

      // Check file size (max 1MB)
      if (file.size > 1000000) {
        errors.push("Ukuran tidak boleh lebih dari 1MB");
      }

      // If error
      if (errors.length > 0) {
        return res.status(400).json({ errors: errors });
      }

      // Create custom filename
      let fileName = crypto.randomBytes(16).toString("hex");

      // Rename the file
      file.name = `${fileName}${path.parse(file.name).ext}`;

      // Make file.mv to promise
      const move = promisify(file.mv);

      // Upload image to /public/images
      await move(`./public/images/contact/${file.name}`);

      // assign req.body.image with file.name
      req.body.photo= `https://api.flutterbedomain.my.id/images/contact/${file.name}`;
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors: errors });
    }




    next();
  } catch (error) {
    next(error);
  }
};
