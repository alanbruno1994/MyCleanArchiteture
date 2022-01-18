import { Router } from "express";
import { ControllerCar } from "../controllers/Car";

const routerCar = Router();
const accessProfile = new ControllerCar();
routerCar.get("/car", accessProfile.findAll);
routerCar.get("/car/:securedId", accessProfile.findOne);
routerCar.post("/car", accessProfile.register);
routerCar.put("/car", accessProfile.update);
routerCar.delete("/car/:securedId", accessProfile.delete);
export default routerCar;
