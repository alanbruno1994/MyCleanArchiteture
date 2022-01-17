import { Result } from "../../../shared/Result";
import { inject, injectable } from "inversify";
import { AbstractUseCase } from "../abstractUseCase";
import { ErrosShared } from "../../module/erros/shared/errosShared";
import {
  IAccessProfileRepository,
  IAccessProfileRepositorySymbol,
  Where,
} from "../../repositories/accessRepository";

@injectable()
export class DeleteAccessProfileUseCase extends AbstractUseCase<Where> {
  constructor(
    @inject(IAccessProfileRepositorySymbol)
    private readonly userRepository: IAccessProfileRepository
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
