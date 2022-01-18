import { ErrosShared } from "../../../2_business/module/erros/shared/errosShared";
import { isIError, Result } from "../../../shared/Result";
import { AbstractController } from "../abstractController";
import { inject, injectable } from "inversify";
import { VerifyUseCase } from "../../../2_business/use_cases/auth/verify";
import { ErrosUser } from "../../../2_business/module/erros/user/userErrors";
import { UserLevelAccessAuthorized } from "../../../2_business/use_cases/user/userLevelAccessAuthorized";
import { UpdateAccessProfileUseCase } from "../../../2_business/use_cases/access_profile/updateAccessProfileUseCase";
import { InputAccessProfileUpdate } from "../../Validators/accessProfile/inputUpdateAccessProfile";
import { FindOneAccessProfileUseCase } from "../../../2_business/use_cases/access_profile/findOneAccessProfileUseCase";

@injectable()
export class UpdateControllerAccessProfile extends AbstractController {
  constructor(
    @inject(UpdateAccessProfileUseCase)
    private readonly updateUserUseCase: UpdateAccessProfileUseCase,
    @inject(FindOneAccessProfileUseCase)
    private readonly findOneFindOneAccessProfileUseCase: FindOneAccessProfileUseCase,
    @inject(VerifyUseCase)
    private readonly verifyToken: VerifyUseCase,
    @inject(UserLevelAccessAuthorized)
    private readonly middlewareLevel: UserLevelAccessAuthorized
  ) {
    super();
  }
  async run(
    input: InputAccessProfileUpdate,
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
      const user = await this.findOneFindOneAccessProfileUseCase.run({
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
