import { isIError, Result } from "../../../shared/Result";
import { AbstractUseCase } from "../abstractUseCase";
import { inject, injectable } from "inversify";
import {
  IUserRepository,
  IUserRepositorySymbol,
} from "../../repositories/userRepository";
import {
  IAccessProfileRepository,
  IAccessProfileRepositorySymbol,
} from "../../repositories/accessRepository";
import { ErrosUser } from "../../module/erros/user/userErrors";
import { SuccessShared } from "../../module/success/shared/successShared";

@injectable()
export class UserLevelAccessAuthorized extends AbstractUseCase<number, Result> {
  constructor(
    @inject(IUserRepositorySymbol)
    private readonly userRepository: IUserRepository,
    @inject(IAccessProfileRepositorySymbol)
    private readonly accessRespository: IAccessProfileRepository
  ) {
    super();
  }

  async run(userId: number): Promise<Result> {
    const user = await this.userRepository.findOne({
      where: { key: "id", valueKey: userId },
    });
    if (isIError(user)) {
      return ErrosUser.errorUserNotFoundMiddlewareAccess();
    }
    const access = await this.accessRespository.findOne({
      where: { key: "id", valueKey: user.body.id },
    });
    if (isIError(access)) {
      return access;
    }
    if (!(access.body.level === "admin")) {
      return ErrosUser.errorUserNotAuthorized();
    }
    return SuccessShared.successFind(user);
  }
}
