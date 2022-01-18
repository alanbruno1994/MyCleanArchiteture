/* eslint-disable node/no-path-concat */
import { Router, Request, Response } from "express";
import { ControllerUserAdapter } from "../controllers/User";

const routerUser = Router();
const user = new ControllerUserAdapter();
routerUser.post("/user/admin", (req: Request, resp: Response) =>
  user.register(req, resp, "admin")
);
routerUser.post("/user/player", (req: Request, resp: Response) =>
  user.register(req, resp, "player")
);
routerUser.get("/user", user.findAll);
routerUser.put("/user/:securedId", user.update);
routerUser.delete("/user/:securedId", user.delete);

export default routerUser;
