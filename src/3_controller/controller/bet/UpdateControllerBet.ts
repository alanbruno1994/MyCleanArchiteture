import { ErrosShared } from "../../../2_business/module/erros/shared/errosShared";
import { isIError, Result } from "../../../shared/Result";
import { AbstractController } from "../abstractController";
import { inject, injectable } from "inversify";
import { VerifyUseCase } from "../../../2_business/use_cases/auth/verify";
import { ErrosUser } from "../../../2_business/module/erros/user/userErrors";
import { UserLevelAccessAuthorized } from "../../../2_business/use_cases/user/userLevelAccessAuthorized";
import { FindOneGameUseCase } from "../../../2_business/use_cases/game/findOneGameUseCase";
import { FindOneUserUseCase } from "../../../2_business/use_cases/user/findOneUserUseCase";
import { InputBetUpdate } from "../../Validators/bet/inputUpdateBet";
import { UpdateBetUseCase } from "../../../2_business/use_cases/bet/updateBetUseCase";

@injectable()
export class UpdateControllerBet extends AbstractController {
  constructor(
    @inject(UpdateBetUseCase)
    private readonly updateBetUseCase: UpdateBetUseCase,
    @inject(FindOneGameUseCase)
    private readonly findOneGameUseCase: FindOneGameUseCase,
    @inject(FindOneUserUseCase)
    private readonly findOneUserUseCase: FindOneUserUseCase,
    @inject(VerifyUseCase)
    private readonly verifyToken: VerifyUseCase,
    @inject(UserLevelAccessAuthorized)
    private readonly middlewareLevel: UserLevelAccessAuthorized
  ) {
    super();
  }
  async run(
    input: InputBetUpdate,
    securedId: string,
    token: string
  ): Promise<Result> {
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
      const user = await this.findOneUserUseCase.run({
        where: { key: "securedId", valueKey: securedId },
      });
      if (isIError(user)) {
        return user;
      }
      const game = await this.findOneGameUseCase.run({
        where: { key: "securedId", valueKey: securedId },
      });
      if (isIError(game)) {
        return game;
      }

      return this.updateBetUseCase.run(input, {
        key: "securedId",
        valueKey: securedId,
      });
    } catch (error) {
      return ErrosShared.errorInternalServerError();
    }
  }
}
