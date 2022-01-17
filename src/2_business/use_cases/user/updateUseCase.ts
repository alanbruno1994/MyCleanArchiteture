import { isIError, Result } from "../../../shared/Result";
import { inject, injectable } from "inversify";
import { AbstractUseCase } from "../abstractUseCase";
import {
  IUserRepository,
  IUserRepositorySymbol,
  Where,
} from "../../repositories/userRepository";
import {
  ICryptService,
  ICryptServiceSymbol,
} from "../../services/cryptService";
import { IUserEnity } from "../../../1_domain/iEntityUser";
import { ErrosShared } from "../../module/erros/shared/errosShared";

export type Input = Partial<
  Omit<IUserEnity, "id" | "createdAt" | "updatedAt" | "securedId">
>;

@injectable()
export class UpdateUserUseCase extends AbstractUseCase<Input> {
  constructor(
    @inject(IUserRepositorySymbol)
    private readonly userRepository: IUserRepository,
    @inject(ICryptServiceSymbol) private readonly hasherService: ICryptService
  ) {
    super();
  }

  async run(input: Input, where: Where): Promise<Result> {
    try {
      const currentDate = new Date();
      let password;
      if (input.password) {
        const result = await this.hasherService.encrypt(input.password);
        if (isIError(result)) {
          return result;
        } else if (result.body) {
          throw new Error();
        }
        password = result.body;
      }
      const user = await this.userRepository.update(
        {
          ...input,
          password,
          updatedAt: currentDate,
        },
        where
      );
      if (isIError(user)) {
        return user;
      }
      return user;
    } catch (Erro) {
      return ErrosShared.errorInternalServerError();
    }
  }
}
