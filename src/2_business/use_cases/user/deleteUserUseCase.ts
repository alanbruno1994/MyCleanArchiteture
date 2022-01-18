import { Result } from "../../../shared/Result";
import { inject, injectable } from "inversify";
import { AbstractUseCase } from "../abstractUseCase";
import {
  IUserRepository,
  IUserRepositorySymbol,
  Where,
} from "../../repositories/userRepository";
import { ErrosShared } from "../../module/erros/shared/errosShared";

@injectable()
export class DeleteUserUseCase extends AbstractUseCase<Where, Result> {
  constructor(
    @inject(IUserRepositorySymbol)
    private readonly userRepository: IUserRepository
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
