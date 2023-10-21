"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Car.belongsTo(models.User, {
        foreignKey: {
          name: "userId",
        },
      });
    }
  }
  Car.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.FLOAT,
      category: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      isAvalible: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      imageUrl: {
        type: DataTypes.TEXT,
        defaultValue:
          "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png",
      },
    },
    {
      sequelize,
      modelName: "Car",
    }
  );
  return Car;
};
