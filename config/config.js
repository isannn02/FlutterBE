// username: "fluw7431_gerry",
// password:"Bantenku12345",
// database: "fluw7431_flutter",
// host: "localhost",
// dialect: "mysql",



module.exports = {
  development: {
    username: "fluw7431_gerry",
    password:"Bantenku12345",
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

