import { isIError, Result } from "../../../shared/Result";
import { AbstractController } from "../abstractController";
import { inject, injectable } from "inversify";
import { ErrosShared } from "../../../2_business/module/erros/shared/errosShared";
import { VerifyUseCase } from "../../../2_business/use_cases/auth/verify";
import { UserLevelAccessAuthorized } from "../../../2_business/use_cases/user/userLevelAccessAuthorized";
import { ErrosUser } from "../../../2_business/module/erros/user/userErrors";
import { FindOneGameUseCase } from "../../../2_business/use_cases/game/findOneGameUseCase";
import { InputBetCreate } from "../../Validators/bet/inputCreateBet";
import { RegisterBetUseCase } from "../../../2_business/use_cases/bet/registerBetUseCase";

@injectable()
export class RegisterControllerBet extends AbstractController {
  constructor(
    @inject(RegisterBetUseCase)
    private readonly registerUseCase: RegisterBetUseCase,
    @inject(FindOneGameUseCase)
    private readonly findOneGameUseCase: FindOneGameUseCase,
    @inject(VerifyUseCase)
    private readonly verifyToken: VerifyUseCase,
    @inject(UserLevelAccessAuthorized)
    private readonly middlewareLevel: UserLevelAccessAuthorized
  ) {
    super();
  }

  async run(input: InputBetCreate, token: string): Promise<Result> {
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
      const game = await this.findOneGameUseCase.run({
        where: { key: "id", valueKey: input.gameId },
      });
      if (isIError(game)) {
        return game;
      }
      const value = await this.registerUseCase.run({
        ...input,
        userId: authorizedAccess.body.id,
        priceGame: game.body.price,
      });
      return value;
    } catch (error) {
      return ErrosShared.errorInternalServerError();
    }
  }
}
