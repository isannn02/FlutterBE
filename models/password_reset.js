"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class password_reset extends Model {
    static associate(models) {}
  }
  password_reset.init(
    {
      
      email: DataTypes.STRING,
      token:DataTypes.STRING,
  
      
    },
    {
      sequelize,
      paranoid: true,
      timestamps: true,
      modelName: "password_reset",
    }
  );
  return password_reset;
};
