const path = require("path");
const crypto = require("crypto");
const validator = require("validator");
const { promisify } = require("util");

// Make class of create or update event validatro
exports.createOrUpadateEventValidator = async (req, res, next) => {
  try {
    const errors = [];

    //   Check input of title
    if (validator.isEmpty(req.body.title, { ignore_whitespace: false })) {
      errors.push("Please input the title!");
    }

    // Check for the image of event was upload or not

    if (!(req.files && req.files.photoEvent)) {
      errors.push("Please upload the image");
    } else if (req.files.photoEvent) {
      // If image was uploaded

      // req.files.photoEvent is come from key (file) in postman
      const file = req.files.photoEvent;

      // Make sure image is photo
      if (!file.mimetype.startsWith("image")) {
        errors.push("File must be an image");
      }

      // Check file size (max 1MB)
      if (file.size > 1000000) {
        errors.push("Image must be less than 1MB");
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
      await move(`./public/images/events/${file.name}`);

      // assign req.body.image with file.name
      req.body.photoEvent = `https://api.flutterbedomain.my.id/images/events/${file.name}`;
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors: errors });
    }
    if (
      !validator.isLength(req.body.detail, {
        min: 5,
        max: 2000,
      })
    ) {
      errors.push("Detail of event min 5 and max 600 characters!");
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors: errors });
    }

    next();
  } catch (error) {
    next(error);
  }
};
