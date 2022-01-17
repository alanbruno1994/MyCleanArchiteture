import { isIError, Result } from "../../../shared/Result";
import { inject, injectable } from "inversify";
import { AbstractUseCase } from "../abstractUseCase";
import {
  IUniqueIdentifierService,
  IUniqueIdentifierServiceSymbol,
} from "../../services/uniqueIdentefierService";
import { ErrosShared } from "../../module/erros/shared/errosShared";
import { IGameEntity } from "../../../1_domain/iEntityGame";
import {
  IGameRepository,
  IGameRepositorySymbol,
} from "../../repositories/gameRepository";

export type Input = Omit<
  IGameEntity,
  "id" | "createdAt" | "updatedAt" | "securedId"
>;

@injectable()
export class RegisterGameUseCase extends AbstractUseCase<Input> {
  constructor(
    @inject(IGameRepositorySymbol)
    private readonly gameRepository: IGameRepository,
    @inject(IUniqueIdentifierServiceSymbol)
    private readonly uniqueIdentifierService: IUniqueIdentifierService
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
      if (securedId.body) {
        const user = await this.gameRepository.create({
          ...input,
          securedId: securedId.body,
          createdAt: currentDate,
          updatedAt: currentDate,
        });
        if (isIError(user)) {
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
