import { Result } from "../../../shared/Result";
import { inject, injectable } from "inversify";
import { AbstractUseCase } from "../abstractUseCase";
import {
  IUserRepository,
  IUserRepositorySymbol,
} from "../../repositories/userRepository";
import { IUserEnity } from "../../../1_domain/iEntityUser";
import { ErrosShared } from "../../module/erros/shared/errosShared";
import { Relation } from "../../repositories/iRelation";

export type Input = Partial<
  Omit<IUserEnity, "id" | "createdAt" | "updatedAt" | "securedId">
>;

@injectable()
export class FindAllUserUseCase extends AbstractUseCase<Relation> {
  constructor(
    @inject(IUserRepositorySymbol)
    private readonly userRepository: IUserRepository
  ) {
    super();
  }

  async run(input: Relation): Promise<Result> {
    try {
      return this.userRepository.findAll(input);
    } catch (Erro) {
      return ErrosShared.errorInternalServerError();
    }
  }
}
