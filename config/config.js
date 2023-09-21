// require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
// require('dotenv').config();

module.exports = {
  development: {
    username: "fluw7431_gerry",
    password:"Banten123",
    database: "fluw7431_flutter",
    host: "localhost",
    dialect: "mysql",
  
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    // dialectOptions: {
    //   ssl: {
    //     rejectUnauthorized: false,
    //   },
    // },
  },
};

