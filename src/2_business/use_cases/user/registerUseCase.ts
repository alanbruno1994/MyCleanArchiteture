import { isIError, Result } from "../../../shared/Result";
import { inject, injectable } from "inversify";
import { AbstractUseCase } from "../abstractUseCase";
import {
  IUserRepository,
  IUserRepositorySymbol,
} from "../../repositories/userRepository";
import {
  ICryptService,
  ICryptServiceSymbol,
} from "../../services/cryptService";
import {
  IUniqueIdentifierService,
  IUniqueIdentifierServiceSymbol,
} from "../../services/uniqueIdentefierService";
import { IUserEnity } from "../../../1_domain/iEntityUser";
import { FindOneAccessProfileUseCase } from "../access_profile/findOneAccessProfileUseCase";
import { ErrosShared } from "../../module/erros/shared/errosShared";

export type Input = Omit<
  IUserEnity,
  "id" | "createdAt" | "updatedAt" | "securedId"
>;

@injectable()
export class RegisterUserUseCase extends AbstractUseCase<Input> {
  constructor(
    @inject(IUserRepositorySymbol)
    private readonly userRepository: IUserRepository,
    @inject(ICryptServiceSymbol) private readonly hasherService: ICryptService,
    @inject(IUniqueIdentifierServiceSymbol)
    private readonly uniqueIdentifierService: IUniqueIdentifierService,
    @inject(FindOneAccessProfileUseCase)
    private readonly findAccess: FindOneAccessProfileUseCase
  ) {
    super();
  }

  async run(input: Input): Promise<Result> {
    try {
      const currentDate = new Date();
      const securedId = await this.uniqueIdentifierService.generate();
      if (isIError(securedId)) {
        return securedId;
      }
      const password = await this.hasherService.encrypt(input.password);
      if (isIError(password)) {
        return password;
      }
      if (securedId.body && password.body) {
        const user = await this.userRepository.create({
          ...input,
          securedId: securedId.body,
          password: password.body,
          createdAt: currentDate,
          updatedAt: currentDate,
        });
        if (isIError(user)) {
          console.log("a4");
          return user;
        }
        return user;
      } else {
        throw new Error();
      }
    } catch (Erro) {
      return ErrosShared.errorInternalServerError();
    }
  }
}
