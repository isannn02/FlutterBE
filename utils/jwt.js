// require("dotenv").config();
const jwt = require("jsonwebtoken")
// let str="gerryajie"
// let SECRET= btoa(str)
const SECRET ="gerryajie"

const createToken = (payload) => {
  try {
    const token = jwt.sign(payload, SECRET)
    return token
  } catch (error) {
    return error
  }
}

const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET)
  } catch (error) {
    return error
  }
}

module.exports = {
  createToken,
  verifyToken
}