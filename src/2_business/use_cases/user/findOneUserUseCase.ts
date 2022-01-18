import { Result } from "../../../shared/Result";
import { inject, injectable } from "inversify";
import { AbstractUseCase } from "../abstractUseCase";
import {
  InputFindOne,
  IUserRepository,
  IUserRepositorySymbol,
} from "../../repositories/userRepository";
import { ErrosShared } from "../../module/erros/shared/errosShared";

@injectable()
export class FindOneUserUseCase extends AbstractUseCase<InputFindOne, Result> {
  constructor(
    @inject(IUserRepositorySymbol)
    private readonly userRepository: IUserRepository
  ) {
    super();
  }

  async run(input: InputFindOne): Promise<Result> {
    try {
      return this.userRepository.findOne(input);
    } catch (Erro) {
      return ErrosShared.errorInternalServerError();
    }
  }
}
