"use strict";
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../config/conectDataBase";
import { v4 } from "uuid";
// 1 Game tem N(User)
export class Game extends Model {}
Game.init(
  {
    securedId: DataTypes.UUID,
    type: DataTypes.STRING,
    color: DataTypes.STRING,
    price: DataTypes.FLOAT,
    range: DataTypes.NUMBER,
    maxNumber: DataTypes.NUMBER,
  },
  {
    sequelize,
    modelName: "Game",
    tableName: "games",
  }
);

Game.addHook("beforeCreate", async (user: any): Promise<void> => {
  user.securedId = v4();
});
