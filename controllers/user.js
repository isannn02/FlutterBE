const { user } = require("../models");
const { createToken, encodePin, compare } = require("../utils/index");
// const sequelize = require("sequelize");

// const path = require("path");
// const crypto = require("crypto");
const randomstring = require('randomstring')
const sendMail = require('../helpers/sendMail')


class User {
  async getDetailUser(req, res, next) {
    try {
      const userId = req.userData.id;

      const data = await user.findOne({
        where: { id: +userId },
        attributes: {
          exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
        },
      });

      res.status(200).json({ success: true, data: data });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, errors: ["Internal Server Error"] });
    }
  }

  async createUser(req, res, next) {
    try {
      const { user_name, email, name, no_hp, password, repassword } = req.body;
      if (password != repassword) {
        return res.status(401).json({
          success: false,
          errors: ["Password dan repassword harus di isi sama"],
        });
      }
      let mailSubject = 'Mail verification'
      const randomToken = randomstring.generate()

      console.log(randomToken, "randomtoken")
      let content = '<p>Hii ' + req.body.name + ',Silahkan <a href="http://127.0.0.1:8000/mail?token=' + randomToken + '">verifikasi </a> Email anda'
      sendMail(req.body.email, mailSubject, content)




      const hashPassword = encodePin(password);

      await user.create({
        user_name: user_name,
        email: email,
        name: name,
        no_hp: no_hp,
        password: hashPassword,
        token: randomToken,
      });

      const data = await user.findOne({
        where: {
          email: email,
        },
        attributes: {
          exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
        },
      });
      // console.log(data, 'ini data yang masuk dan disimpan di db')
      const payload = {
        id: data.dataValues.id,
        email: data.dataValues.email,
      };
      const token = createToken(payload);

      res.status(200).json({ success: true, data: data });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, errors: ["Internal Server Error"] });
    }
  }

  async updateUser(req, res, next) {
    try {
      const userId = req.userData.id;
      const checkUserName = req.userData.user_name
      const checkEmail = req.userData.email
      if (checkUserName == req.body.user_name) {
        return res.status(401).json({
          success: false,
          errors: ["User name sudah ada"],
        });
      }
      if (checkEmail == req.body.email) {
        return res.status(401).json({
          success: false,
          errors: ["Email sudah ada"],
        });
      }


      await user.update(req.body, {
        where: { id: +userId },
      });

      const data = await user.findOne({
        where: {
          id: +userId,
        },
      });

      res.status(201).json({ success: true, message: ["Success Update Data"] });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, errors: ["Internal Server Error"] });
    }
  }

  async deleteUser(req, res, next) {
    try {
      const userId = req.userData.id;
      const deletedData = await user.destroy({
        where: {
          id: +userId,
        },
        force: true,
      });

      if (deletedData.id != +userId) {
        return res
          .status(404)
          .json({ success: false, message: ["User has been deleted"] });
      }

      res
        .status(200)
        .json({ success: true, message: ["Success deleting data"] });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, errors: ["Internal Server Error"] });
    }
  }

  async login(req, res, next) {
    try {
      const user_name = req.body.user_name;
      const password = req.body.password;

      const loginUser = await user.findOne({
        where: {
          user_name: user_name,
        },
      });

      if (loginUser == null) {
        return res.status(401).json({
          success: false,
          errors: ["Masukan user name dan password yang benar"],
        });
      }

      if (loginUser != null && loginUser.dataValues.is_verify == 0) {
        return res.status(401).json({
          success: false,
          errors: ["Silahkan cek email untuk memverifikasi"],
        });
      }

      const hashPass = loginUser.dataValues.password;
      const compareResult = compare(password, hashPass);

      if (!compareResult) {
        return res.status(401).json({
          success: false,
          errors: ["Masukan user name dan password yang benar"],
        });
      }

      const payload = {
        id: loginUser.dataValues.id,
        user_name: loginUser.dataValues.user_name,
        name: loginUser.dataValues.name,
        email: loginUser.dataValues.email,
        role: loginUser.dataValues.role,
      };
      const token = createToken(payload);
      res.status(200).json({
        success: true,
        token: token,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, errors: ["Internal Server Error"] });
    }
  }
  async updatePassword(req, res, next) {
    try {
      const userId = req.userData.id;
      const { password, confirmPassword } = req.body;
      const hashPassword = encodePin(password);

      if (password != confirmPassword) {
        return res.status(400).json({
          success: false,
          errors: ["Password and Confirm Password not match"],
        });
      }

      await user.update(
        {
          password: hashPassword,
        },
        {
          where: { id: +userId },
        }
      );

      const data = await user.findOne({
        where: {
          id: +userId,
        },
      });

      res.status(201).json({ success: true, message: ["Sukses update password"] });
    } catch (error) {
      res.status(500).json({ success: false, errors: ["Internal Server Error"] });
    }
  }
}

module.exports = new User();
