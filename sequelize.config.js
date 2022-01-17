require("dotenv").config();

const NODE_ENV = process.env.NODE_ENV ?? "dev";
let config = {
  host: NODE_ENV === "test" ? process.env.DB_TEST_HOST : process.env.DB_HOST,
  port: NODE_ENV === "test" ? process.env.DB_TEST_PORT : process.env.DB_PORT,
  username:
    NODE_ENV === "test" ? process.env.DB_TEST_USER : process.env.DB_USER,
  password:
    NODE_ENV === "test"
      ? process.env.DB_TEST_PASSWORD
      : process.env.DB_PASSWORD,
  database:
    NODE_ENV === "test" ? process.env.DB_TEST_NAME : process.env.DB_NAME,
  dialect:
    NODE_ENV === "test" ? process.env.DB_TEST_DIALECT : process.env.DB_DIALECT,
};
if (["prod", "production"].includes(NODE_ENV.toLocaleLowerCase())) {
  config = {
    host: process.env.PROD_MYSQL_HOST,
    port: process.env.PROD_MYSQL_PORT,
    username: process.env.PROD_MYSQL_USER,
    password: process.env.PROD_MYSQL_PASS,
    database: process.env.PROD_MYSQL_NAME,
    dialect: process.env.DB_DIALECT,
  };
}
module.exports = config;
