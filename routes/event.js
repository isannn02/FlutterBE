const express = require("express");


const { authentication } = require("../middlewares/Auth/authentication");
const {
    createEvent,
    getAllEvent,
    updateEvent

  } = require("../controllers/event");
  const {
    createOrUpadateEventValidator
  } = require("../middlewares/validators/event");



const router = express.Router();

router.get("/all",authentication, getAllEvent);
router.post("/create",authentication,createOrUpadateEventValidator, createEvent);
router.put("/:id",authentication,createOrUpadateEventValidator, updateEvent);










module.exports = router;