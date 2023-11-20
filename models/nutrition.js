"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class nutrition extends Model {
    static associate(models) {}
  }
  nutrition.init(
    {
      
      name: DataTypes.STRING,
      link:DataTypes.STRING,
      photo:DataTypes.STRING,
  
      
    },
    {
      sequelize,
      paranoid: true,
      timestamps: true,
      modelName: "nutritions",
    }
  );
  return nutrition;
};
