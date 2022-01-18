import { isIError, Result } from "../../../shared/Result";
import { inject, injectable } from "inversify";
import { AbstractUseCase } from "../abstractUseCase";
import {
  IUniqueIdentifierService,
  IUniqueIdentifierServiceSymbol,
} from "../../services/uniqueIdentefierService";
import { ErrosShared } from "../../module/erros/shared/errosShared";
import { IAccessProfileEntity } from "../../../1_domain/iEntityAccessProfile";
import {
  IAccessProfileRepository,
  IAccessProfileRepositorySymbol,
} from "../../repositories/accessRepository";

export type Input = Omit<
  IAccessProfileEntity,
  "id" | "createdAt" | "updatedAt" | "securedId"
>;

@injectable()
export class RegisterAccessProfileUseCase extends AbstractUseCase<
  Input,
  Result
> {
  constructor(
    @inject(IAccessProfileRepositorySymbol)
    private readonly accessRepository: IAccessProfileRepository,
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
        const access = await this.accessRepository.create({
          ...input,
          securedId: securedId.body,
          createdAt: currentDate,
          updatedAt: currentDate,
        });
        if (isIError(access)) {
          return access;
        }
        return access;
      } else {
        throw new Error();
      }
    } catch (Erro) {
      return ErrosShared.errorInternalServerError();
    }
  }
}
