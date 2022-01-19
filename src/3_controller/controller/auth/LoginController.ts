import { isIError, Result } from "../../../shared/Result";
import { InputLogin } from "../../Validators/auth/authInput";
import { AbstractController } from "../abstractController";
import { inject, injectable } from "inversify";
import { FindOneUserUseCase } from "../../../2_business/use_cases/user";
import { TokenLoginUseCase } from "../../../2_business/use_cases/auth";
import { ErrosShared } from "../../../2_business/module/erros/shared/errosShared";

@injectable()
export class LoginController extends AbstractController {
  constructor(
    @inject(TokenLoginUseCase)
    private readonly login: TokenLoginUseCase,
    @inject(FindOneUserUseCase)
    private readonly findOneUserUseCase: FindOneUserUseCase
  ) {
    super();
  }
  async run(input: InputLogin): Promise<Result> {
    try {
      input.validate();
    } catch (error) {
      return ErrosShared.errorValidateError(error);
    }
    const user = await this.findOneUserUseCase.run({
      where: { key: "email", valueKey: input.email },
      attributes: ["id", "password", "secured_id"],
    });

    if (isIError(user)) {
      return user;
    }

    return this.login.run({
      id: user.body.id,
      securedId: user.body.securedId,
      password: input.password,
      hashPassword: user.body.password,
    });
  }
}
