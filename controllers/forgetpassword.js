const { user, password_reset } = require("../models");
const { createToken, encodePin, compare } = require("../utils/index");
// const sequelize = require("sequelize");

// const path = require("path");
// const crypto = require("crypto");
const randomstring = require('randomstring')
const sendMail = require('../helpers/sendMail')


const forgetPassword = async (req, res) => {
    try {

        let email = req.body.email




        const result = await user.findOne({
            where: { email: email },
            attributes: {
                exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
            },
        });

        if (result != null) {
            // await user.update({
            //     token: null,
            //     is_verify: 1
            // }, { where: { id: result.dataValues.id } }
            // )
            // return res.render('mailverification')
            let mailSubject = 'Forget Password';
            const randomstringa = randomstring.generate();
            let content = '<p>Hai ,' + result.dataValues.name + '\
            Silahkan <a href="http://127.0.0.1:8000/forgetpassword?token='+ randomstringa + '">Klik Disini</a> Untuk reset password anda</p>\
            ';


            sendMail(email, mailSubject, content);

            const data = await password_reset.create({
                email: email,
                token: randomstringa
            })
            return res.status(200).send({
                message: "email reset password sukses terkirim"
            })
        } else {
            return res.status(401).send({ message: "email tidak terdaftar" })
        }

    } catch (error) {

        console.log(error,"ini errornya")

    }




}
module.exports = { forgetPassword }