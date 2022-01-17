import { Result } from "../../../shared/Result";
import { inject, injectable } from "inversify";
import { AbstractUseCase } from "../abstractUseCase";
import { ErrosShared } from "../../module/erros/shared/errosShared";
import { Relation } from "../../repositories/iRelation";
import {
  ICarRepository,
  ICarRepositorySymbol,
} from "../../repositories/carRepository";

@injectable()
export class FindAllCarUseCase extends AbstractUseCase<Relation> {
  constructor(
    @inject(ICarRepositorySymbol)
    private readonly userRepository: ICarRepository
  ) {
    super();
  }

  async run(input: Relation): Promise<Result> {
    try {
      return this.userRepository.findAll(input);
    } catch (Erro) {
      return ErrosShared.errorInternalServerError();
    }
  }
}
