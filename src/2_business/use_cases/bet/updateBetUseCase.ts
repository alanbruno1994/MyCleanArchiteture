import { Result } from "../../../shared/Result";
import { inject, injectable } from "inversify";
import { AbstractUseCase } from "../abstractUseCase";
import { ErrosShared } from "../../module/erros/shared/errosShared";
import {
  IBetRepository,
  IBetRepositorySymbol,
  InputUpdate,
  Where,
} from "../../repositories/betRepository";

@injectable()
export class UpdateBetUseCase extends AbstractUseCase<InputUpdate> {
  constructor(
    @inject(IBetRepositorySymbol)
    private readonly carRepository: IBetRepository
  ) {
    super();
  }

  async run(input: InputUpdate, where: Where): Promise<Result> {
    try {
      const currentDate = new Date();
      const user = await this.carRepository.update(
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
