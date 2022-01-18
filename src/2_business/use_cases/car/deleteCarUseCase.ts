import { Result } from "../../../shared/Result";
import { inject, injectable } from "inversify";
import { AbstractUseCase } from "../abstractUseCase";
import { ErrosShared } from "../../module/erros/shared/errosShared";
import {
  ICarRepository,
  ICarRepositorySymbol,
  Where,
} from "../../repositories/carRepository";

@injectable()
export class DeleteCarUseCase extends AbstractUseCase<Where, Result> {
  constructor(
    @inject(ICarRepositorySymbol)
    private readonly userRepository: ICarRepository
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
