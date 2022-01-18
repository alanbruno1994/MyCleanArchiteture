import { Router } from "express";
import { ControllerAccessProfileAdapter } from "../controllers/AccessProfile";

const routerAccessProfile = Router();
const accessProfile = new ControllerAccessProfileAdapter();
routerAccessProfile.get("/access", accessProfile.findAll);
routerAccessProfile.get("/access/:securedId", accessProfile.findOne);
routerAccessProfile.post("/access", accessProfile.register);
routerAccessProfile.put("/access", accessProfile.update);
routerAccessProfile.delete("/access/:securedId", accessProfile.delete);
export default routerAccessProfile;
