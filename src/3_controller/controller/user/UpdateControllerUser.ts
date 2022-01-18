import { ErrosShared } from "../../../2_business/module/erros/shared/errosShared";
import { isIError, Result } from "../../../shared/Result";
import { InputUpdateUser } from "../../Validators/user/inputUpdateUser";
import { AbstractController } from "../abstractController";
import { inject, injectable } from "inversify";
import { UpdateUserUseCase } from "../../../2_business/use_cases/user/updateUseCase";
import { FindOneUserUseCase } from "../../../2_business/use_cases/user/findOneUserUseCase";
import { FindOneAccessProfileUseCase } from "../../../2_business/use_cases/access_profile/findOneAccessProfileUseCase";
import { FindOneCarUseCase } from "../../../2_business/use_cases/car/findOneCarUseCase";
import { VerifyUseCase } from "../../../2_business/use_cases/auth/verify";
import { ErrosUser } from "../../../2_business/module/erros/user/userErrors";
import { UserLevelAccessAuthorized } from "../../../2_business/use_cases/user/userLevelAccessAuthorized";

@injectable()
export class UpdateControllerUser extends AbstractController {
  constructor(
    @inject(UpdateUserUseCase)
    private readonly updateUserUseCase: UpdateUserUseCase,
    @inject(FindOneUserUseCase)
    private readonly findOneUserCase: FindOneUserUseCase,
    @inject(FindOneAccessProfileUseCase)
    private readonly findOneAccessProfileUseCase: FindOneAccessProfileUseCase,
    @inject(FindOneCarUseCase)
    private readonly findOneCarUseCase: FindOneCarUseCase,
    @inject(VerifyUseCase)
    private readonly verifyToken: VerifyUseCase,
    @inject(UserLevelAccessAuthorized)
    private readonly middlewareLevel: UserLevelAccessAuthorized
  ) {
    super();
  }
  async run(
    input: InputUpdateUser,
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
      if (input.accessProfileId) {
        const access = await this.findOneAccessProfileUseCase.run({
          where: { key: "id", valueKey: input.accessProfileId },
        });
        if (isIError(access)) {
          return access;
        }
      }
      if (input.carId) {
        const car = await this.findOneCarUseCase.run({
          where: { key: "id", valueKey: input.carId },
        });
        if (isIError(car)) {
          return car;
        }
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
