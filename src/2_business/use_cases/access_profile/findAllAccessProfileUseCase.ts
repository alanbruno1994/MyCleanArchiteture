import { Result } from "../../../shared/Result";
import { inject, injectable } from "inversify";
import { AbstractUseCase } from "../abstractUseCase";
import { ErrosShared } from "../../module/erros/shared/errosShared";
import { Relation } from "../../repositories/iRelation";
import {
  IAccessProfileRepository,
  IAccessProfileRepositorySymbol,
} from "../../repositories/accessRepository";

@injectable()
export class FindAllAccessProfileUseCase extends AbstractUseCase<
  Relation,
  Result
> {
  constructor(
    @inject(IAccessProfileRepositorySymbol)
    private readonly userRepository: IAccessProfileRepository
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
