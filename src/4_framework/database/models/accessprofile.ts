"use strict";
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../config/conectDataBase";
import { v4 } from "uuid";
// Um AccessProfile tem N(Users)
export class AccessProfile extends Model {}
AccessProfile.init(
  {
    level: DataTypes.STRING,
    securedId: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "AccessProfile",
    tableName: "access_profiles",
  }
);

AccessProfile.addHook("beforeCreate", async (user: any): Promise<void> => {
  user.securedId = v4();
});
