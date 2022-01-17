"use strict";
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../config/conectDataBase";
import { AccessProfile } from "./accessprofile";
import { Bet } from "./bet";
import { Car } from "./car";
import { Game } from "./game";

// Tem Relacao 1(User) tem 1(AcessProfile)
// 1 User tem N(Games)
// 1 User tem 1 Car
export class User extends Model<any> {}
User.init(
  {
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    securedId: DataTypes.STRING,
    email: DataTypes.STRING,
    accessProfileId: DataTypes.NUMBER,
    carId: DataTypes.NUMBER,
    // recoverPassword: DataTypes.STRING,
    // expireRecoverPassword: DataTypes.DATE,
    image: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
  }
);

User.belongsTo(AccessProfile, {
  as: "accessProfile",
  foreignKey: "access_profile_id",
});

User.hasMany(Bet, {
  as: "bets",
  foreignKey: "user_id",
});

AccessProfile.hasMany(User, {
  as: "users",
  foreignKey: "access_profile_id",
});

User.belongsToMany(Game, {
  as: "games",
  through: Bet,
  foreignKey: "user_id",
});

Game.belongsToMany(User, {
  as: "users",
  through: Bet,
  foreignKey: "game_id",
});

Bet.hasOne(User, {
  as: "user",
  sourceKey: "user_id",
  foreignKey: "id",
});
Bet.hasOne(Game, {
  as: "game",
  sourceKey: "game_id",
  foreignKey: "id",
});

User.belongsTo(Car, {
  as: "car",
  foreignKey: "car_id",
});

Car.hasOne(User, {
  as: "user",
  sourceKey: "id",
  foreignKey: "car_id",
});
