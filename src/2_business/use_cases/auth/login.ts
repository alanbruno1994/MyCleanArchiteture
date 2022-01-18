import { isIError, Result } from "../../../shared/Result";
import { AbstractUseCase } from "../abstractUseCase";
import { inject, injectable } from "inversify";
import {
  ICryptService,
  ICryptServiceSymbol,
} from "../../services/cryptService";
import {
  IUserRepository,
  IUserRepositorySymbol,
} from "../../repositories/userRepository";
import {
  ITokenService,
  ITokenServiceSymbol,
} from "../../services/tokenService";

type Input = {
  email: string;
  password: string;
};

@injectable()
export class LoginUseCase extends AbstractUseCase<Input, Result> {
  constructor(
    @inject(ICryptServiceSymbol) private readonly hasherService: ICryptService,
    @inject(IUserRepositorySymbol)
    private readonly userRepository: IUserRepository,
    @inject(ITokenServiceSymbol)
    private readonly tokenService: ITokenService
  ) {
    super();
  }
  async run(input: Input): Promise<Result> {
    const user = await this.userRepository.findOne({
      where: { key: "email", valueKey: input.password },
    });
    if (isIError(user)) {
      return user;
    }
    const resultHash = await this.hasherService.compare(
      input.password,
      user.body.password
    );
    if (isIError(resultHash)) {
      return resultHash;
    }
    return await this.tokenService.generate({
      id: user.body.id,
      securedId: user.body.securedId,
    });
  }
}
