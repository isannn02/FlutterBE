const { user, password_reset } = require("../models");
const { createToken, encodePin, compare } = require("../utils/index");
const validator = require("validator");
// const sequelize = require("sequelize");
const bcrypt = require('bcryptjs')

// const path = require("path");
// const crypto = require("crypto");
const randomstring = require('randomstring')
const sendMail = require('../helpers/sendMail')


const verifyMail = async (req, res) => {
    try {
        let tokenParam = req.query.token

        const result = await user.findOne({
            where: { token: tokenParam },
            attributes: {
                exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
            },
        });

        if (result != null) {
            await user.update({
                token: null,
                is_verify: 1
            }, { where: { id: result.dataValues.id } }
            )
            return res.render('mailverification')
        } else {
            return res.render('404')
        }


    } catch (error) {

    }

}

const resetPasswordLoad = async (req, res) => {

    try {
        let tokenParam = req.query.token
        const result = await password_reset.findOne({
            where: { token: tokenParam },
            attributes: {
                exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
            },
        });
        if (result != null) {
            await user.findOne({
                token: null,
                is_verify: 1
            }, { where: { email: result.dataValues.email } }
            )
            return res.render('reset-password', { user: result.dataValues })
        } else {
            return res.render('404')
        }


    } catch (error) {
        console.log(error)

    }
}
const resetPassword = async (req, res) => {

    try {
    


        if (req.body.password != req.body.confirm_password) {
            res.render('reset-password', { error_message: 'Password tidak sama', user: { id: req.body.user_id, email: req.body.email } });
        }
        if (!validator.isStrongPassword(req.body.password))
            res.render('reset-password', { error_message: 'Password harus 8 karakter terdiri minimal 1 hurup besar, 1 angka dan 1 simbol karakter', user: { id: req.body.user_id, email: req.body.email } });
        //  { errors.push("Password harus 8 karakter terdiri minimal 1 hurup besar, 1 angka dan 1 simbol karakter"); }

        // bcrypt.hash(req.body.confirm_password, 10, (err, hash) => {
        //     if (err) {
        //         console.log(err)
        //     }

        // })
      


        const hashPassword = encodePin(req.body.confirm_password);
        // console.log(req.body.user_id, "id nya")
        // console.log(req.body.email, "emailnya")

        await password_reset.destroy({
            where: {
                email: req.body.email
            },
            // force: true,
        })
        await user.update({
            password: hashPassword,
        }, {
            where: {
                email: req.body.email
            }
        })

        return res.render('message', { message: 'Password telah sukses di ganti' })



    } catch (error) {
        console.log(error)

    }
}




module.exports = { verifyMail, resetPasswordLoad, resetPassword }