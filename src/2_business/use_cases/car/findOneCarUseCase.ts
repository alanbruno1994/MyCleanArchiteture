import { Result } from "../../../shared/Result";
import { inject, injectable } from "inversify";
import { AbstractUseCase } from "../abstractUseCase";
import { ErrosShared } from "../../module/erros/shared/errosShared";
import {
  ICarRepository,
  ICarRepositorySymbol,
  InputFindOne,
} from "../../repositories/carRepository";

@injectable()
export class FindOneCarUseCase extends AbstractUseCase<InputFindOne> {
  constructor(
    @inject(ICarRepositorySymbol)
    private readonly carRepository: ICarRepository
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
