const express = require("express");


const { authentication } = require("../middlewares/Auth/authentication");
const {
    createContact,
    getAllcontact,
    updateContact

  } = require("../controllers/contact");
  const {
    createOrUpadateContactValidator
  } = require("../middlewares/validators/contact");



const router = express.Router();



router.put('/:id', authentication,createOrUpadateContactValidator,updateContact);
router.get("/all",authentication, getAllcontact);

router.post("/create",authentication,createOrUpadateContactValidator, createContact);













module.exports = router;