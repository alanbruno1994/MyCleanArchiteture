import { ErrosShared } from "../../../2_business/module/erros/shared/errosShared";
import { isIError, Result } from "../../../shared/Result";
import { AbstractController } from "../abstractController";
import { inject, injectable } from "inversify";
import { VerifyUseCase } from "../../../2_business/use_cases/auth/verify";
import { ErrosUser } from "../../../2_business/module/erros/user/userErrors";
import { UserLevelAccessAuthorized } from "../../../2_business/use_cases/user/userLevelAccessAuthorized";
import { UpdateGameUseCase } from "../../../2_business/use_cases/game/updateGameUseCase";
import { FindOneGameUseCase } from "../../../2_business/use_cases/game/findOneGameUseCase";
import { InputUpdateGame } from "../../Validators/game/inputUpdateGame";

@injectable()
export class UpdateControllerGame extends AbstractController {
  constructor(
    @inject(UpdateGameUseCase)
    private readonly updateUserUseCase: UpdateGameUseCase,
    @inject(FindOneGameUseCase)
    private readonly findOneUserCase: FindOneGameUseCase,
    @inject(VerifyUseCase)
    private readonly verifyToken: VerifyUseCase,
    @inject(UserLevelAccessAuthorized)
    private readonly middlewareLevel: UserLevelAccessAuthorized
  ) {
    super();
  }
  async run(
    input: InputUpdateGame,
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
      const user = await this.findOneUserCase.run({
        where: { key: "securedId", valueKey: securedId },
      });
      if (isIError(user)) {
        return user;
      }

      return this.updateUserUseCase.run(input, {
        key: "securedId",
        valueKey: securedId,
      });
    } catch (error) {
      return ErrosShared.errorInternalServerError();
    }
  }
}
