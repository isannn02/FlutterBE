const express = require("express");


const { authentication } = require("../middlewares/Auth/authentication");
const {
    createNutrition,
    getAllNutrition,
    updateNutrition

  } = require("../controllers/nutrition");
  const {
    createOrUpadateNutritionValidator
  } = require("../middlewares/validators/nutrition");



const router = express.Router();



router.put('/:id', authentication,createOrUpadateNutritionValidator,updateNutrition);
router.get("/all",authentication, getAllNutrition);

router.post("/create",authentication,createOrUpadateNutritionValidator, createNutrition);













module.exports = router;