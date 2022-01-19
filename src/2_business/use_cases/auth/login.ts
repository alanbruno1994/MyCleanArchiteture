import { isIError, Result } from "../../../shared/Result";
import { AbstractUseCase } from "../abstractUseCase";
import { inject, injectable } from "inversify";
import {
  ICryptService,
  ICryptServiceSymbol,
} from "../../services/cryptService";
import {
  ITokenService,
  ITokenServiceSymbol,
} from "../../services/tokenService";

type Input = {
  password: string;
  hashPassword: string;
  id: number;
  securedId: string;
};

@injectable()
export class TokenLoginUseCase extends AbstractUseCase<Input, Result> {
  constructor(
    @inject(ICryptServiceSymbol) private readonly hasherService: ICryptService,
    @inject(ITokenServiceSymbol)
    private readonly tokenService: ITokenService
  ) {
    super();
  }
  async run(input: Input): Promise<Result> {
    const resultHash = await this.hasherService.compare(
      input.password,
      input.hashPassword
    );
    if (isIError(resultHash)) {
      return resultHash;
    }
    return await this.tokenService.generate({
      id: input.id,
      securedId: input.securedId,
    });
  }
}
