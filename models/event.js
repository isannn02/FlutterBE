"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class events extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.events.belongsTo(models.user, {
        foreignKey: "userId",
      });


      // models.events.hasMany(models.ratings, {
      //   foreignKey: "eventId",
      // });

      // define association here
    }
  }
  events.init(
    {
      title: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      photoEvent: DataTypes.STRING,
      detail: DataTypes.STRING(3000),

   
    },
    {
      sequelize,
      paranoid: true,
      timestamps: true,
      modelName: "events",
    }
  );

  return events;
};
