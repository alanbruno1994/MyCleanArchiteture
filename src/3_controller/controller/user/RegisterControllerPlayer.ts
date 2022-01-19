import { isIError, isSuccess, Result } from "../../../shared/Result";
import { InputCreateUser } from "../../Validators/user/inputCreateUser";
import { AbstractController } from "../abstractController";
import { inject, injectable } from "inversify";
import { RegisterUserUseCase } from "../../../2_business/use_cases/user/registerUseCase";
import { FindOneAccessProfileUseCase } from "../../../2_business/use_cases/access_profile/findOneAccessProfileUseCase";
import { ErrosShared } from "../../../2_business/module/erros/shared/errosShared";
import { FindOneUserUseCase } from "../../../2_business/use_cases/user";
import { ErrosUser } from "../../../2_business/module/erros/user/userErrors";

@injectable()
export class RegisterControllerPlayer extends AbstractController {
  constructor(
    @inject(RegisterUserUseCase)
    private readonly registerUseCase: RegisterUserUseCase,
    @inject(FindOneAccessProfileUseCase)
    private readonly findOneAccessProfile: FindOneAccessProfileUseCase,
    @inject(FindOneUserUseCase)
    private readonly findOneUser: FindOneUserUseCase
  ) {
    super();
  }

  async run(
    input: InputCreateUser,
    metaDataImage: any = undefined
  ): Promise<Result> {
    try {
      input.validate();
    } catch (error) {
      return ErrosShared.errorValidateError(error);
    }
    const access = await this.findOneAccessProfile.run({
      where: { key: "level", valueKey: "player" },
    });

    const testEmail = await this.findOneUser.run({
      where: { key: "email", valueKey: input.email },
    });

    if (isSuccess(testEmail)) {
      return ErrosUser.errorUserEmailIsAreadyUse();
    }
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
  }
}
