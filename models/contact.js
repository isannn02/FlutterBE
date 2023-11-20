"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class contacts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     

      // define association here
    }
  }
  contacts.init(
    {
      // userId: DataTypes.STRING,
    //   eventId: DataTypes.STRING,
      nama: DataTypes.STRING,
      no_hp: DataTypes.STRING,
      photo: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true,
      timestamps: true,
      modelName: "contacts",
    }
  );

  return contacts;
};
