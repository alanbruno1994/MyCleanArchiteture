import { ErrosShared } from "../../../2_business/module/erros/shared/errosShared";
import { isIError, Result } from "../../../shared/Result";
import { AbstractController } from "../abstractController";
import { inject, injectable } from "inversify";
import { VerifyUseCase } from "../../../2_business/use_cases/auth/verify";
import { ErrosUser } from "../../../2_business/module/erros/user/userErrors";
import { UserLevelAccessAuthorized } from "../../../2_business/use_cases/user/userLevelAccessAuthorized";
import { FindOneBetUseCase } from "../../../2_business/use_cases/bet/findOneBetUseCase";

@injectable()
export class FindOneControllerBet extends AbstractController {
  constructor(
    @inject(FindOneBetUseCase)
    private readonly findOneBetUseCase: FindOneBetUseCase,
    @inject(VerifyUseCase)
    private readonly verifyToken: VerifyUseCase,
    @inject(UserLevelAccessAuthorized)
    private readonly middlewareLevel: UserLevelAccessAuthorized
  ) {
    super();
  }
  async run(securedId: string, token: string): Promise<Result> {
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
      const game = await this.findOneBetUseCase.run({
        where: { key: "securedId", valueKey: securedId },
      });
      return game;
    } catch (error) {
      return ErrosShared.errorInternalServerError();
    }
  }
}
