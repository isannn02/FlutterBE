"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      models.user.hasMany(models.events, {
        foreignKey: "userId",
      });
      models.user.hasMany(models.comments, {
        foreignKey: "userId",
      });


    }
  }
  user.init(
    {
      user_name: DataTypes.STRING,
      email: DataTypes.STRING,
      name: DataTypes.STRING,    
      password: DataTypes.STRING,    
      role:DataTypes.STRING,
      token:DataTypes.STRING,   
      no_hp: DataTypes.STRING,
      is_verify:DataTypes.INTEGER,
      gender: DataTypes.STRING,
      height: DataTypes.STRING,
      recent_weight: DataTypes.STRING,
      goals_weight: DataTypes.STRING,
      
    },
    {
      sequelize,
      paranoid: true,
      timestamps: true,
      modelName: "user",
    }
  );
  return user;
};
