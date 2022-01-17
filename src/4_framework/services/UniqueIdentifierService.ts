import { IUniqueIdentifierService } from "../../2_business/services/uniqueIdentefierService";
import { Result } from "../../shared/Result";
import { v4 } from "uuid";
import { injectable } from "inversify";
import { SuccessShared } from "../../2_business/module/success/shared/successShared";
import { ErrosShared } from "../../2_business/module/erros/shared/errosShared";
@injectable()
export class UniqueIdentifierService implements IUniqueIdentifierService {
  async generate(): Promise<Result> {
    try {
      return SuccessShared.successService(await v4());
    } catch (error) {
      return ErrosShared.errorGenerateIdentifierService();
    }
  }
}
