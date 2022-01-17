import { ContainerModule, interfaces } from "inversify";
import { FindOneAccessProfileUseCase } from "../../2_business/use_cases/access_profile/findOneAccessProfileUseCase";
import { RegisterUserUseCase } from "../../2_business/use_cases/user/registerUseCase";
import { UpdateUserUseCase } from "../../2_business/use_cases/user/updateUseCase";

export const useCaseModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(RegisterUserUseCase).to(RegisterUserUseCase);
  bind(UpdateUserUseCase).to(UpdateUserUseCase);
  bind(FindOneAccessProfileUseCase).to(FindOneAccessProfileUseCase);
});
