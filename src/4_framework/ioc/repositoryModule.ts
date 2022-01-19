import { ContainerModule, interfaces } from "inversify";
import {
  IAccessProfileRepository,
  IAccessProfileRepositorySymbol,
} from "../../2_business/repositories/accessRepository";
import {
  IBetRepository,
  IBetRepositorySymbol,
} from "../../2_business/repositories/betRepository";
import {
  ICarRepository,
  ICarRepositorySymbol,
} from "../../2_business/repositories/carRepository";
import {
  IGameRepository,
  IGameRepositorySymbol,
} from "../../2_business/repositories/gameRepository";
import {
  IUserRepository,
  IUserRepositorySymbol,
} from "../../2_business/repositories/userRepository";
import { AccessProfilerRepository } from "../database/repositories/AccessProfileRepository";
import { BetRepository } from "../database/repositories/BetRepository";
import { CarRepository } from "../database/repositories/CarRepository";
import { GameRepository } from "../database/repositories/GameRepository";
import { UserRepository } from "../database/repositories/UserRepository";

export const repositoryModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IUserRepository>(IUserRepositorySymbol).to(UserRepository);
  bind<IAccessProfileRepository>(IAccessProfileRepositorySymbol).to(
    AccessProfilerRepository
  );
  bind<IBetRepository>(IBetRepositorySymbol).to(BetRepository);
  bind<ICarRepository>(ICarRepositorySymbol).to(CarRepository);
  bind<IGameRepository>(IGameRepositorySymbol).to(GameRepository);
});
