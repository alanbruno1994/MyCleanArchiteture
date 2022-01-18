import { Result } from "../../../shared/Result";
import { inject, injectable } from "inversify";
import { AbstractUseCase } from "../abstractUseCase";
import { ErrosShared } from "../../module/erros/shared/errosShared";
import {
  IGameRepository,
  IGameRepositorySymbol,
  InputUpdate,
  Where,
} from "../../repositories/gameRepository";

@injectable()
export class UpdateGameUseCase extends AbstractUseCase<InputUpdate, Result> {
  constructor(
    @inject(IGameRepositorySymbol)
    private readonly gameRepository: IGameRepository
  ) {
    super();
  }

  async run(input: InputUpdate, where: Where): Promise<Result> {
    try {
      const currentDate = new Date();
      const user = await this.gameRepository.update(
        {
          ...input,
          updatedAt: currentDate,
        },
        where
      );
      return user;
    } catch (Erro) {
      return ErrosShared.errorInternalServerError();
    }
  }
}
