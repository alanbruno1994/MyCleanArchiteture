import { isIError, Result } from "../../../shared/Result";
import { inject, injectable } from "inversify";
import { AbstractUseCase } from "../abstractUseCase";
import {
  IUniqueIdentifierService,
  IUniqueIdentifierServiceSymbol,
} from "../../services/uniqueIdentefierService";
import { ErrosShared } from "../../module/erros/shared/errosShared";
import { IBetEntity } from "../../../1_domain/iEntityBet";
import {
  IBetRepository,
  IBetRepositorySymbol,
} from "../../repositories/betRepository";

export type Input = Omit<
  IBetEntity,
  "id" | "createdAt" | "updatedAt" | "securedId"
>;

@injectable()
export class RegisterBetUseCase extends AbstractUseCase<Input, Result> {
  constructor(
    @inject(IBetRepositorySymbol)
    private readonly carRepository: IBetRepository,
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
        const user = await this.carRepository.create({
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
