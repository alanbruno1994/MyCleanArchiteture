import { ContainerModule, interfaces } from "inversify";
import {
  DeleteAccessProfileUseCase,
  FindAllAccessProfileUseCase,
  FindOneAccessProfileUseCase,
  RegisterAccessProfileUseCase,
  UpdateAccessProfileUseCase,
} from "../../2_business/use_cases/access_profile";
import { LoginUseCase, VerifyUseCase } from "../../2_business/use_cases/auth";
import {
  DeleteBetUseCase,
  FindAllBetUseCase,
  FindOneBetUseCase,
  RegisterBetUseCase,
  UpdateBetUseCase,
} from "../../2_business/use_cases/bet";
import {
  DeleteCarUseCase,
  FindAllCarUseCase,
  FindOneCarUseCase,
  RegisterCarUseCase,
  UpdateCarUseCase,
} from "../../2_business/use_cases/car";
import {
  DeleteGameUseCase,
  FindAllGameUseCase,
  FindOneGameUseCase,
  RegisterGameUseCase,
  UpdateGameUseCase,
} from "../../2_business/use_cases/game";
import {
  DeleteUserUseCase,
  FindAllUserUseCase,
  FindOneUserUseCase,
  RegisterUserUseCase,
  UpdateUserUseCase,
  UserLevelAccessAuthorized,
} from "../../2_business/use_cases/user";

export const useCaseModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(DeleteAccessProfileUseCase).to(DeleteAccessProfileUseCase);
  bind(FindAllAccessProfileUseCase).to(FindAllAccessProfileUseCase);
  bind(FindOneAccessProfileUseCase).to(FindOneAccessProfileUseCase);
  bind(RegisterAccessProfileUseCase).to(RegisterAccessProfileUseCase);
  bind(UpdateAccessProfileUseCase).to(UpdateAccessProfileUseCase);

  bind(LoginUseCase).to(LoginUseCase);
  bind(VerifyUseCase).to(VerifyUseCase);

  bind(DeleteBetUseCase).to(DeleteBetUseCase);
  bind(FindAllBetUseCase).to(FindAllBetUseCase);
  bind(FindOneBetUseCase).to(FindOneBetUseCase);
  bind(RegisterBetUseCase).to(RegisterBetUseCase);
  bind(UpdateBetUseCase).to(UpdateBetUseCase);

  bind(DeleteCarUseCase).to(DeleteCarUseCase);
  bind(FindAllCarUseCase).to(FindAllCarUseCase);
  bind(FindOneCarUseCase).to(FindOneCarUseCase);
  bind(RegisterCarUseCase).to(RegisterCarUseCase);
  bind(UpdateCarUseCase).to(UpdateCarUseCase);

  bind(DeleteGameUseCase).to(DeleteGameUseCase);
  bind(FindAllGameUseCase).to(FindAllGameUseCase);
  bind(FindOneGameUseCase).to(FindOneGameUseCase);
  bind(RegisterGameUseCase).to(RegisterGameUseCase);
  bind(UpdateGameUseCase).to(UpdateGameUseCase);

  bind(DeleteUserUseCase).to(DeleteUserUseCase);
  bind(FindAllUserUseCase).to(FindAllUserUseCase);
  bind(FindOneUserUseCase).to(FindOneUserUseCase);
  bind(RegisterUserUseCase).to(RegisterUserUseCase);
  bind(UpdateUserUseCase).to(UpdateUserUseCase);
  bind(UserLevelAccessAuthorized).to(UserLevelAccessAuthorized);
});
