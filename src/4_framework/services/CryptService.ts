import { compare, genSalt, hash } from "bcrypt";
import { ICryptService } from "../../2_business/services/cryptService";
import { Result } from "../../shared/Result";
import { injectable } from "inversify";
import { SuccessShared } from "../../2_business/module/success/shared/successShared";
import { ErrosShared } from "../../2_business/module/erros/shared/errosShared";
@injectable()
export class CryptService implements ICryptService {
  async encrypt(input: string): Promise<Result> {
    try {
      const salt = await genSalt(6);
      return SuccessShared.successService(await hash(input, salt));
    } catch (error) {
      return ErrosShared.errorGenerateSecreteValeu();
    }
  }
  async compare(value: string, hash: string): Promise<Result> {
    try {
      if (await compare(value, hash)) {
        return SuccessShared.successService();
      }
      return ErrosShared.errorNotPossibleComparer2Data();
    } catch (error) {
      return ErrosShared.errorInternalServerError();
    }
  }
}
