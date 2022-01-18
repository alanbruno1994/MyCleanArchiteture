import { Result } from "../../../shared/Result";
import { inject, injectable } from "inversify";
import { AbstractUseCase } from "../abstractUseCase";
import { ErrosShared } from "../../module/erros/shared/errosShared";
import {
  IAccessProfileRepository,
  IAccessProfileRepositorySymbol,
  InputUpdate,
  Where,
} from "../../repositories/accessRepository";

@injectable()
export class UpdateAccessProfileUseCase extends AbstractUseCase<
  InputUpdate,
  Result
> {
  constructor(
    @inject(IAccessProfileRepositorySymbol)
    private readonly carRepository: IAccessProfileRepository
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
