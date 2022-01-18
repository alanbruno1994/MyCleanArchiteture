import { isIError, Result } from "../../../shared/Result";
import { InputCreateUser } from "../../Validators/user/inputCreateUser";
import { AbstractController } from "../abstractController";
import { inject, injectable } from "inversify";
import { RegisterUserUseCase } from "../../../2_business/use_cases/user/registerUseCase";
import { FindOneAccessProfileUseCase } from "../../../2_business/use_cases/access_profile/findOneAccessProfileUseCase";
import { ErrosShared } from "../../../2_business/module/erros/shared/errosShared";
import { VerifyUseCase } from "../../../2_business/use_cases/auth/verify";
import { UserLevelAccessAuthorized } from "../../../2_business/use_cases/user/userLevelAccessAuthorized";
import { ErrosUser } from "../../../2_business/module/erros/user/userErrors";

@injectable()
export class RegisterControllerAdmin extends AbstractController {
  constructor(
    @inject(RegisterUserUseCase)
    private readonly registerUseCase: RegisterUserUseCase,
    @inject(FindOneAccessProfileUseCase)
    private readonly findOneAccessProfile: FindOneAccessProfileUseCase,
    @inject(VerifyUseCase)
    private readonly verifyToken: VerifyUseCase,
    @inject(UserLevelAccessAuthorized)
    private readonly middlewareLevel: UserLevelAccessAuthorized
  ) {
    super();
  }

  async run(
    input: InputCreateUser,
    token: string,
    metaDataImage: any = undefined
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
      const access = await this.findOneAccessProfile.run({
        where: { key: "level", valueKey: "player" },
      });

      if (isIError(access)) {
        return access;
      }
      const value = await this.registerUseCase.run(
        {
          ...input,
          accessProfileId: access.body.id,
        },
        metaDataImage
      );
      return value;
    } catch (error) {
      return ErrosShared.errorInternalServerError();
    }
  }
}
