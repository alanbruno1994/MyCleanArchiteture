import { Result } from "../../../shared/Result";
import { inject, injectable } from "inversify";
import { AbstractUseCase } from "../abstractUseCase";
import { ErrosShared } from "../../module/erros/shared/errosShared";
import { Relation } from "../../repositories/iRelation";
import {
  IGameRepository,
  IGameRepositorySymbol,
} from "../../repositories/gameRepository";

@injectable()
export class FindAllGameUseCase extends AbstractUseCase<Relation, Result> {
  constructor(
    @inject(IGameRepositorySymbol)
    private readonly userRepository: IGameRepository
  ) {
    super();
  }

  async run(input: Relation = { name: [] }): Promise<Result> {
    try {
      return this.userRepository.findAll(input);
    } catch (Erro) {
      return ErrosShared.errorInternalServerError();
    }
  }
}
