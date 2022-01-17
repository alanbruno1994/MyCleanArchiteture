import { Result } from "../../../shared/Result";
import { inject, injectable } from "inversify";
import { AbstractUseCase } from "../abstractUseCase";
import { ErrosShared } from "../../module/erros/shared/errosShared";
import {
  IGameRepository,
  IGameRepositorySymbol,
  InputFindOne,
} from "../../repositories/gameRepository";

@injectable()
export class FindOneGameUseCase extends AbstractUseCase<InputFindOne> {
  constructor(
    @inject(IGameRepositorySymbol)
    private readonly carRepository: IGameRepository
  ) {
    super();
  }

  async run(input: InputFindOne): Promise<Result> {
    try {
      return this.carRepository.findOne(input);
    } catch (Erro) {
      return ErrosShared.errorInternalServerError();
    }
  }
}
