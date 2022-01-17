"use strict";
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../config/conectDataBase";

export class Car extends Model {}
Car.init(
  {
    securedId: DataTypes.STRING,
    model: DataTypes.STRING,
    color: DataTypes.STRING,
    year: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: "Car",
    tableName: "cars",
  }
);
