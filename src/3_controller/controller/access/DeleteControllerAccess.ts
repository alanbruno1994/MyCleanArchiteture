import { ErrosShared } from "../../../2_business/module/erros/shared/errosShared";
import { isIError, Result } from "../../../shared/Result";
import { AbstractController } from "../abstractController";
import { inject, injectable } from "inversify";
import { VerifyUseCase } from "../../../2_business/use_cases/auth/verify";
import { ErrosUser } from "../../../2_business/module/erros/user/userErrors";
import { UserLevelAccessAuthorized } from "../../../2_business/use_cases/user/userLevelAccessAuthorized";
import { DeleteAccessProfileUseCase } from "../../../2_business/use_cases/access_profile/deleteAccessProfileUseCase";
import { FindOneAccessProfileUseCase } from "../../../2_business/use_cases/access_profile/findOneAccessProfileUseCase";

@injectable()
export class DeleteControllerAccessProfile extends AbstractController {
  constructor(
    @inject(DeleteAccessProfileUseCase)
    private readonly deleteAccessProfileUseCase: DeleteAccessProfileUseCase,
    @inject(FindOneAccessProfileUseCase)
    private readonly findOneAccessProfileUseCase: FindOneAccessProfileUseCase,
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
      const access = await this.findOneAccessProfileUseCase.run({
        where: { key: "securedId", valueKey: securedId },
      });
      if (isIError(access)) {
        return access;
      }
      return this.deleteAccessProfileUseCase.run({
        key: "id",
        valueKey: access.body.id,
      });
    } catch (error) {
      return ErrosShared.errorInternalServerError();
    }
  }
}
