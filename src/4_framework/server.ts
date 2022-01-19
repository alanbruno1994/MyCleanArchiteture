import app from "./config/app";
require("dotenv").config();

app.listen(process.env.PORT, () => {
  console.log("Run Server");
});
