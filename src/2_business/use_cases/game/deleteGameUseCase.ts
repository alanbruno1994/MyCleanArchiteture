import { Result } from "../../../shared/Result";
import { inject, injectable } from "inversify";
import { AbstractUseCase } from "../abstractUseCase";
import { ErrosShared } from "../../module/erros/shared/errosShared";
import {
  IGameRepository,
  IGameRepositorySymbol,
  Where,
} from "../../repositories/gameRepository";

@injectable()
export class DeleteGameUseCase extends AbstractUseCase<Where, Result> {
  constructor(
    @inject(IGameRepositorySymbol)
    private readonly userRepository: IGameRepository
  ) {
    super();
  }

  async run(input: Where): Promise<Result> {
    try {
      return this.userRepository.delete(input);
    } catch (Erro) {
      return ErrosShared.errorInternalServerError();
    }
  }
}
