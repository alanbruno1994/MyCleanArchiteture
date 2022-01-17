import { ContainerModule, interfaces } from "inversify";
import { AccessProfile } from "../database/models/accessprofile";
import { Bet } from "../database/models/bet";
import { Car } from "../database/models/car";
import { Game } from "../database/models/game";
import { User } from "../database/models/user";

export const modelsModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(AccessProfile).toConstructor(AccessProfile);
  bind(User).toConstructor(User);
  bind(Game).toConstructor(Game);
  bind(Bet).toConstructor(Bet);
  bind(Car).toConstructor(Car);
});
