const express = require("express");
const user_route=express();

user_route.set('view engine','ejs')
user_route.set('views','./views')
user_route.use(express.static('public'))




const userController=require('../controllers/mailVerify')


// const router = express.Router();

user_route.get('/mail',userController.verifyMail)
user_route.get('/forgetpassword',userController.resetPasswordLoad)
user_route.post('/forgetpassword',userController.resetPassword)

module.exports = user_route;