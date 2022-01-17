import { Sequelize, Options } from "sequelize";
const sequelizeConfig = require("../../../sequelize.config");
require("dotenv").config();
const connectionOptions: Options = {
  ...sequelizeConfig,
  pool: {
    max: 5,
    min: 0,
  },
  define: { underscored: true },
  dialectOptions: {
    connectTimeout: 60000,
  },
};
export const sequelize = new Sequelize(connectionOptions);
