import { Router } from "express";
import { ControllerLogin } from "../controllers/login";

const routerLogin = Router();

routerLogin.post("/login", ControllerLogin.auth);

export default routerLogin;
