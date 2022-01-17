import { Result } from "../../../shared/Result";
import { inject, injectable } from "inversify";
import { AbstractUseCase } from "../abstractUseCase";
import {
  IUserRepository,
  IUserRepositorySymbol,
  Where,
} from "../../repositories/userRepository";
import { IUserEnity } from "../../../1_domain/iEntityUser";
import { ErrosShared } from "../../module/erros/shared/errosShared";

export type Input = Partial<
  Omit<IUserEnity, "id" | "createdAt" | "updatedAt" | "securedId">
>;

@injectable()
export class DeleteUserUseCase extends AbstractUseCase<Where> {
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
