const path = require("path");
const crypto = require("crypto");
const validator = require("validator");
const { promisify } = require("util");

// Make class of create or update event validatro
exports.createOrUpadateNutritionValidator = async (req, res, next) => {
  try {
    const errors = [];

    //   Check input of title
    if (validator.isEmpty(req.body.name, { ignore_whitespace: false })) {
      errors.push("Silahkan Input Name!");
    }

    // Check for the image of event was upload or not

    if (!(req.files && req.files.photo)) {
      errors.push("Silahkan upload gambar");
    } else if (req.files.photo) {
      // If image was uploaded

      // req.files.photoEvent is come from key (file) in postman
      const file = req.files.photo;

      // Make sure image is photo
      if (!file.mimetype.startsWith("image")) {
        errors.push("File harus gambar");
      }

      // Check file size (max 1MB)
      if (file.size > 1000000) {
        errors.push("Tidak boleh lebih dari 1MB");
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
      await move(`./public/images/nutrition/${file.name}`);

      // assign req.body.image with file.name
      req.body.photo= `https://api.flutterbedomain.my.id/images/nutrition/${file.name}`;
    }
    if (
        !validator.isLength(req.body.link, {
          min: 5,
          max: 2000,
        })
      ) {
        errors.push("link minimal 5 karakter");
      }
    if (errors.length > 0) {
      return res.status(400).json({ errors: errors });
    }




    next();
  } catch (error) {
    next(error);
  }
};
