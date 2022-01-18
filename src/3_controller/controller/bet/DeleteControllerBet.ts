import { ErrosShared } from "../../../2_business/module/erros/shared/errosShared";
import { isIError, Result } from "../../../shared/Result";
import { AbstractController } from "../abstractController";
import { inject, injectable } from "inversify";
import { VerifyUseCase } from "../../../2_business/use_cases/auth/verify";
import { ErrosUser } from "../../../2_business/module/erros/user/userErrors";
import { UserLevelAccessAuthorized } from "../../../2_business/use_cases/user/userLevelAccessAuthorized";
import { DeleteBetUseCase } from "../../../2_business/use_cases/bet/deleteBetUseCase";
import { FindOneBetUseCase } from "../../../2_business/use_cases/bet/findOneBetUseCase";

@injectable()
export class DeleteControllerBet extends AbstractController {
  constructor(
    @inject(DeleteBetUseCase)
    private readonly deleteBetUseCase: DeleteBetUseCase,
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
      if (isIError(game)) {
        return game;
      }
      return this.deleteBetUseCase.run({
        key: "id",
        valueKey: game.body.id,
      });
    } catch (error) {
      return ErrosShared.errorInternalServerError();
    }
  }
}
