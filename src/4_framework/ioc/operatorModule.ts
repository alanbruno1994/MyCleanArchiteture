import { ContainerModule, interfaces } from "inversify";
import {
  DeleteControllerAccessProfile,
  FindAllControllerAccessProfile,
  FindOneControllerAccessProfile,
  RegisterControllerAccessProfile,
  UpdateControllerAccessProfile,
} from "../../3_controller/controller/access";
import { LoginController } from "../../3_controller/controller/auth/LoginController";
import {
  DeleteControllerBet,
  FindAllControllerBet,
  FindOneControllerBet,
  RegisterControllerBet,
  UpdateControllerBet,
} from "../../3_controller/controller/bet";
import {
  DeleteControllerCar,
  FindAllControllerCar,
  FindOneControllerCar,
  RegisterControllerCar,
  UpdateControllerCar,
} from "../../3_controller/controller/car";
import {
  DeleteControllerGame,
  FindAllControllerGame,
  FindOneControllerGame,
  RegisterControllerGame,
  UpdateControllerGame,
} from "../../3_controller/controller/game";
import {
  DeleteControllerUser,
  FindAllControllerUser,
  FindOneControllerUser,
  RegisterControllerAdmin,
  RegisterControllerPlayer,
  UpdateControllerUser,
} from "../../3_controller/controller/user";

export const operatorModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(RegisterControllerPlayer).to(RegisterControllerPlayer);
  bind(RegisterControllerAdmin).to(RegisterControllerAdmin);
  bind(FindAllControllerUser).to(FindAllControllerUser);
  bind(FindOneControllerUser).to(FindOneControllerUser);
  bind(UpdateControllerUser).to(UpdateControllerUser);
  bind(DeleteControllerUser).to(DeleteControllerUser);
  bind(DeleteControllerGame).to(DeleteControllerGame);
  bind(FindAllControllerGame).to(FindAllControllerGame);
  bind(FindOneControllerGame).to(FindOneControllerGame);
  bind(RegisterControllerGame).to(RegisterControllerGame);
  bind(UpdateControllerGame).to(UpdateControllerGame);
  bind(DeleteControllerCar).to(DeleteControllerCar);
  bind(FindAllControllerCar).to(FindAllControllerCar);
  bind(FindOneControllerCar).to(FindOneControllerCar);
  bind(RegisterControllerCar).to(RegisterControllerCar);
  bind(UpdateControllerCar).to(UpdateControllerCar);
  bind(DeleteControllerBet).to(DeleteControllerBet);
  bind(FindAllControllerBet).to(FindAllControllerBet);
  bind(FindOneControllerBet).to(FindOneControllerBet);
  bind(RegisterControllerBet).to(RegisterControllerBet);
  bind(UpdateControllerBet).to(UpdateControllerBet);
  bind(DeleteControllerAccessProfile).to(DeleteControllerAccessProfile);
  bind(FindAllControllerAccessProfile).to(FindAllControllerAccessProfile);
  bind(FindOneControllerAccessProfile).to(FindOneControllerAccessProfile);
  bind(RegisterControllerAccessProfile).to(RegisterControllerAccessProfile);
  bind(UpdateControllerAccessProfile).to(UpdateControllerAccessProfile);
  bind(LoginController).to(LoginController);
});
