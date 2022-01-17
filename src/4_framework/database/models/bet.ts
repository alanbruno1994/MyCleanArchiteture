"use strict";
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../config/conectDataBase";
import { v4 } from "uuid";
/*
  +1 Bet tem User e 1 Game 
  + Bet e a tabela intermediaria entre User e Game que possuem relacao N para N
*/
export class Bet extends Model {}
Bet.init(
  {
    securedId: DataTypes.STRING,
    priceGame: DataTypes.FLOAT,
    numberChoose: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    gameId: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: "Bet",
    tableName: "bets",
  }
);

Bet.addHook("beforeCreate", async (user: any): Promise<void> => {
  user.securedId = v4();
});
