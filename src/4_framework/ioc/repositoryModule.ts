import { ContainerModule, interfaces } from "inversify";
import {
  IAccessProfileRepository,
  IAccessProfileRepositorySymbol,
} from "../../2_business/repositories/accessRepository";
import {
  IUserRepository,
  IUserRepositorySymbol,
} from "../../2_business/repositories/userRepository";
import { AccessProfilerRepository } from "../database/repositories/AccessProfileRepository";
import { UserRepository } from "../database/repositories/UserRepository";

export const repositoryModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IUserRepository>(IUserRepositorySymbol).to(UserRepository);
  bind<IAccessProfileRepository>(IAccessProfileRepositorySymbol).to(
    AccessProfilerRepository
  );
});
