import { ErrosShared } from "../../../2_business/module/erros/shared/errosShared";
import { isIError, Result } from "../../../shared/Result";
import { AbstractController } from "../abstractController";
import { inject, injectable } from "inversify";
import { VerifyUseCase } from "../../../2_business/use_cases/auth/verify";
import { ErrosUser } from "../../../2_business/module/erros/user/userErrors";
import { UserLevelAccessAuthorized } from "../../../2_business/use_cases/user/userLevelAccessAuthorized";
import { DeleteCarUseCase } from "../../../2_business/use_cases/car/deleteCarUseCase";
import { FindOneCarUseCase } from "../../../2_business/use_cases/car/findOneCarUseCase";

@injectable()
export class DeleteControllerCar extends AbstractController {
  constructor(
    @inject(DeleteCarUseCase)
    private readonly deleteCarUseCase: DeleteCarUseCase,
    @inject(FindOneCarUseCase)
    private readonly findOneCarUseCase: FindOneCarUseCase,
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
      const car = await this.findOneCarUseCase.run({
        where: { key: "securedId", valueKey: securedId },
      });
      if (isIError(car)) {
        return car;
      }
      return this.deleteCarUseCase.run({
        key: "id",
        valueKey: car.body.id,
      });
    } catch (error) {
      return ErrosShared.errorInternalServerError();
    }
  }
}
