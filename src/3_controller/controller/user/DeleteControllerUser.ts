import { ErrosShared } from "../../../2_business/module/erros/shared/errosShared";
import { isIError, Result } from "../../../shared/Result";
import { AbstractController } from "../abstractController";
import { inject, injectable } from "inversify";
import { FindOneUserUseCase } from "../../../2_business/use_cases/user/findOneUserUseCase";
import { VerifyUseCase } from "../../../2_business/use_cases/auth/verify";
import { ErrosUser } from "../../../2_business/module/erros/user/userErrors";
import { DeleteUserUseCase } from "../../../2_business/use_cases/user/deleteUserUseCase";
import { UserLevelAccessAuthorized } from "../../../2_business/use_cases/user/userLevelAccessAuthorized";

@injectable()
export class DeleteControllerUser extends AbstractController {
  constructor(
    @inject(DeleteUserUseCase)
    private readonly deleteUserUseCase: DeleteUserUseCase,
    @inject(FindOneUserUseCase)
    private readonly findOneUserUseCase: FindOneUserUseCase,
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
      const user = await this.findOneUserUseCase.run({
        where: { key: "securedId", valueKey: securedId },
      });
      if (isIError(user)) {
        return user;
      }
      return this.deleteUserUseCase.run({
        key: "id",
        valueKey: user.body.id,
      });
    } catch (error) {
      return ErrosShared.errorInternalServerError();
    }
  }
}
