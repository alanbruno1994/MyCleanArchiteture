import { ErrosShared } from "../../../2_business/module/erros/shared/errosShared";
import { isIError, Result } from "../../../shared/Result";
import { AbstractController } from "../abstractController";
import { inject, injectable } from "inversify";
import { VerifyUseCase } from "../../../2_business/use_cases/auth/verify";
import { ErrosUser } from "../../../2_business/module/erros/user/userErrors";
import { UserLevelAccessAuthorized } from "../../../2_business/use_cases/user/userLevelAccessAuthorized";
import { FindAllAccessProfileUseCase } from "../../../2_business/use_cases/access_profile/findAllAccessProfileUseCase";

@injectable()
export class FindAllControllerAccessProfile extends AbstractController {
  constructor(
    @inject(FindAllAccessProfileUseCase)
    private readonly findAllAccessProfileUseCase: FindAllAccessProfileUseCase,
    @inject(VerifyUseCase)
    private readonly verifyToken: VerifyUseCase,
    @inject(UserLevelAccessAuthorized)
    private readonly middlewareLevel: UserLevelAccessAuthorized
  ) {
    super();
  }
  async run(token: string): Promise<Result> {
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
      const user = await this.findAllAccessProfileUseCase.run();
      return user;
    } catch (error) {
      return ErrosShared.errorInternalServerError();
    }
  }
}
