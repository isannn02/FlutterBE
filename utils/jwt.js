// require("dotenv").config();
const jwt = require("jsonwebtoken")
const SECRET="gerryajie"

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