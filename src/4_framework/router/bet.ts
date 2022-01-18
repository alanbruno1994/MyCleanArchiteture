import { Router } from "express";
import { ControllerBetAdapter } from "../controllers/Bet";

const routerBet = Router();
const bet = new ControllerBetAdapter();
routerBet.get("/bet", bet.findAll);
routerBet.get("/bet/:securedId", bet.findOne);
routerBet.post("/bet", bet.register);
routerBet.put("/bet", bet.update);
routerBet.delete("/bet/:securedId", bet.delete);
export default routerBet;
