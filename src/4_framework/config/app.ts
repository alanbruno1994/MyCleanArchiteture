import express from "express";
import routerAccessProfile from "../router/acess";
import routerLogin from "../router/auth";
import routerBet from "../router/bet";
import routerCar from "../router/car";
import routerGame from "../router/game";
import routerUser from "../router/user";
const fileUpload = require("express-fileupload");
const app = express();
app.use(express.json());
app.use(
  fileUpload({
    createParentPath: true,
  })
);
app.use(routerUser);
app.use(routerAccessProfile);
app.use(routerGame);
app.use(routerBet);
app.use(routerLogin);
app.use(routerCar);
export default app;
