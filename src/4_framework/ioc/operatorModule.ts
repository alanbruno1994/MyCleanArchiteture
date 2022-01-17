import { ContainerModule, interfaces } from "inversify";
import { RegisterControllerplayer } from "../../3_controller/controller/user/RegisterControllerPlayer";

export const operatorModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(RegisterControllerplayer).to(RegisterControllerplayer);
});
