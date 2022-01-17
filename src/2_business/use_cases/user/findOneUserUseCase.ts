import { Result } from "../../../shared/Result";
import { inject, injectable } from "inversify";
import { AbstractUseCase } from "../abstractUseCase";
import {
  InputFindOne,
  IUserRepository,
  IUserRepositorySymbol,
} from "../../repositories/userRepository";
import { IUserEnity } from "../../../1_domain/iEntityUser";
import { ErrosShared } from "../../module/erros/shared/errosShared";

export type Input = Partial<
  Omit<IUserEnity, "id" | "createdAt" | "updatedAt" | "securedId">
>;

@injectable()
export class FindOneUserUseCase extends AbstractUseCase<InputFindOne> {
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
