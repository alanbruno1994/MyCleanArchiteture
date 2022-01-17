import { Result } from "../../../shared/Result";
import { inject, injectable } from "inversify";
import { AbstractUseCase } from "../abstractUseCase";
import { ErrosShared } from "../../module/erros/shared/errosShared";
import {
  IBetRepository,
  IBetRepositorySymbol,
  InputFindOne,
} from "../../repositories/betRepository";

@injectable()
export class FindOneBetUseCase extends AbstractUseCase<InputFindOne> {
  constructor(
    @inject(IBetRepositorySymbol)
    private readonly betRepository: IBetRepository
  ) {
    super();
  }

  async run(input: InputFindOne): Promise<Result> {
    try {
      return this.betRepository.findOne(input);
    } catch (Erro) {
      return ErrosShared.errorInternalServerError();
    }
  }
}
