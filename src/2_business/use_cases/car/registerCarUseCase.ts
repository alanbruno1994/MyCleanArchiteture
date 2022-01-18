import { isIError, Result } from "../../../shared/Result";
import { inject, injectable } from "inversify";
import { AbstractUseCase } from "../abstractUseCase";
import {
  IUniqueIdentifierService,
  IUniqueIdentifierServiceSymbol,
} from "../../services/uniqueIdentefierService";
import { ErrosShared } from "../../module/erros/shared/errosShared";
import {
  ICarRepository,
  ICarRepositorySymbol,
} from "../../repositories/carRepository";
import { ICarEntity } from "../../../1_domain/iEntityCar";

export type Input = Omit<
  ICarEntity,
  "id" | "createdAt" | "updatedAt" | "securedId"
>;

@injectable()
export class RegisterCarUseCase extends AbstractUseCase<Input, Result> {
  constructor(
    @inject(ICarRepositorySymbol)
    private readonly carRepository: ICarRepository,
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
