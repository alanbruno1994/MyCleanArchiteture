import { isIError, Result } from "../../../shared/Result";
import { AbstractController } from "../abstractController";
import { inject, injectable } from "inversify";
import { ErrosShared } from "../../../2_business/module/erros/shared/errosShared";
import { VerifyUseCase } from "../../../2_business/use_cases/auth/verify";
import { UserLevelAccessAuthorized } from "../../../2_business/use_cases/user/userLevelAccessAuthorized";
import { ErrosUser } from "../../../2_business/module/erros/user/userErrors";
import { RegisterGameUseCase } from "../../../2_business/use_cases/game/registerGameUseCase";
import { InputGameCreate } from "../../Validators/game/inputCreateGame";

@injectable()
export class RegisterControllerGame extends AbstractController {
  constructor(
    @inject(RegisterGameUseCase)
    private readonly registerUseCase: RegisterGameUseCase,
    @inject(VerifyUseCase)
    private readonly verifyToken: VerifyUseCase,
    @inject(UserLevelAccessAuthorized)
    private readonly middlewareLevel: UserLevelAccessAuthorized
  ) {
    super();
  }

  async run(input: InputGameCreate, token: string): Promise<Result> {
    try {
      const decode = await this.verifyToken.run(token);
      if (isIError(decode)) {
        return ErrosUser.errorUserNotAuthorized();
      }
      const authorizedAccess = await this.middlewareLevel.run(
        decode.body.userId
      );
      if (authorizedAccess && isIError(authorizedAccess)) {
        return authorizedAccess;
      }
      try {
        input.validate();
      } catch (error) {
        return ErrosShared.errorValidateError(error);
      }
      const value = await this.registerUseCase.run({
        ...input,
      });
      return value;
    } catch (error) {
      return ErrosShared.errorInternalServerError();
    }
  }
}
