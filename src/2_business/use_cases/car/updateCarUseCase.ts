import { Result } from "../../../shared/Result";
import { inject, injectable } from "inversify";
import { AbstractUseCase } from "../abstractUseCase";
import { ErrosShared } from "../../module/erros/shared/errosShared";
import {
  ICarRepository,
  ICarRepositorySymbol,
  InputUpdate,
  Where,
} from "../../repositories/carRepository";

@injectable()
export class UpdateCarUseCase extends AbstractUseCase<InputUpdate, Result> {
  constructor(
    @inject(ICarRepositorySymbol)
    private readonly carRepository: ICarRepository
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
