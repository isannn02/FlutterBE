const express = require("express");


const { authentication } = require("../middlewares/Auth/authentication");
const {
  createNutritionCut,
  createNutritionBulk,
  getAllNutritionBulk,
  getAllNutritionCut,
  updateNutrition

  } = require("../controllers/nutrition");
  const {
    createOrUpadateNutritionValidator
  } = require("../middlewares/validators/nutrition");



const router = express.Router();



router.put('/:id', authentication,createOrUpadateNutritionValidator,updateNutrition);
router.get("/all/bulk",authentication, getAllNutritionBulk);
router.get("/all/cut",authentication, getAllNutritionCut);

router.post("/create/bulk",authentication,createOrUpadateNutritionValidator, createNutritionBulk);
router.post("/create/cut",authentication,createOrUpadateNutritionValidator, createNutritionCut);













module.exports = router;