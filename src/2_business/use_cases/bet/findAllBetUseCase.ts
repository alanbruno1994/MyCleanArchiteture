import { Result } from "../../../shared/Result";
import { inject, injectable } from "inversify";
import { AbstractUseCase } from "../abstractUseCase";
import { ErrosShared } from "../../module/erros/shared/errosShared";
import { Relation } from "../../repositories/iRelation";
import {
  IBetRepository,
  IBetRepositorySymbol,
} from "../../repositories/betRepository";

@injectable()
export class FindAllBetUseCase extends AbstractUseCase<Relation, Result> {
  constructor(
    @inject(IBetRepositorySymbol)
    private readonly betRepository: IBetRepository
  ) {
    super();
  }

  async run(input: Relation = { name: [] }): Promise<Result> {
    try {
      return this.betRepository.findAll(input);
    } catch (Erro) {
      return ErrosShared.errorInternalServerError();
    }
  }
}
