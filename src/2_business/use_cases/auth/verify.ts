import { Result } from "../../../shared/Result";
import { AbstractUseCase } from "../abstractUseCase";
import { inject, injectable } from "inversify";
import {
  ITokenService,
  ITokenServiceSymbol,
} from "../../services/tokenService";

@injectable()
export class VerifyUseCase extends AbstractUseCase<string, Result> {
  constructor(
    @inject(ITokenServiceSymbol)
    private readonly tokenService: ITokenService
  ) {
    super();
  }
  async run(token: string): Promise<Result> {
    return await this.tokenService.decode(token);
  }
}
