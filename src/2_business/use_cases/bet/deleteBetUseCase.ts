import { Result } from "../../../shared/Result";
import { inject, injectable } from "inversify";
import { AbstractUseCase } from "../abstractUseCase";
import { ErrosShared } from "../../module/erros/shared/errosShared";
import {
  IBetRepository,
  IBetRepositorySymbol,
  Where,
} from "../../repositories/betRepository";

@injectable()
export class DeleteBetUseCase extends AbstractUseCase<Where, Result> {
  constructor(
    @inject(IBetRepositorySymbol)
    private readonly betRepository: IBetRepository
  ) {
    super();
  }

  async run(input: Where): Promise<Result> {
    try {
      return this.betRepository.delete(input);
    } catch (Erro) {
      return ErrosShared.errorInternalServerError();
    }
  }
}
