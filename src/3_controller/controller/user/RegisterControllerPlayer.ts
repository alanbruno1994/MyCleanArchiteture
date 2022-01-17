import { isIError, Result } from "../../../shared/Result";
import { InputCreateUser } from "../../Validators/user/inputCreateUser";
import { AbstractController } from "../abstractController";
import { inject, injectable } from "inversify";
import { RegisterUserUseCase } from "../../../2_business/use_cases/user/registerUseCase";
import { FindOneAccessProfileUseCase } from "../../../2_business/use_cases/access_profile/findOneAccessProfileUseCase";
import { ErrosShared } from "../../../2_business/module/erros/shared/errosShared";

@injectable()
export class RegisterControllerplayer extends AbstractController {
  constructor(
    @inject(RegisterUserUseCase)
    private readonly registerUseCase: RegisterUserUseCase,
    @inject(FindOneAccessProfileUseCase)
    private readonly findOneAccessProfile: FindOneAccessProfileUseCase
  ) {
    super();
  }

  async run(input: InputCreateUser): Promise<Result> {
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
    const value = await this.registerUseCase.run({
      ...input,
      accessProfileId: access.body.id,
    });
    return value;
  }
}
