import { Result } from "../../../shared/Result";
import { inject, injectable } from "inversify";
import { AbstractUseCase } from "../abstractUseCase";
import {
  IAccessProfileRepository,
  IAccessProfileRepositorySymbol,
  InputFindOne,
} from "../../repositories/accessRepository";
import { ErrosShared } from "../../module/erros/shared/errosShared";

@injectable()
export class FindOneAccessProfileUseCase extends AbstractUseCase<InputFindOne> {
  constructor(
    @inject(IAccessProfileRepositorySymbol)
    private readonly accessRepository: IAccessProfileRepository
  ) {
    super();
  }

  async run(input: InputFindOne): Promise<Result> {
    try {
      const result = await this.accessRepository.findOne(input);
      return result;
    } catch (Erro) {
      return ErrosShared.errorInternalServerError();
    }
  }
}
