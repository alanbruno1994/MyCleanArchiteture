import { injectable } from "inversify";
import { ITokenService } from "../../2_business/services/tokenService";
import { Result } from "../../shared/Result";
import JWT from "jsonwebtoken";
import { SuccessShared } from "../../2_business/module/success/shared/successShared";
import { ErrosShared } from "../../2_business/module/erros/shared/errosShared";
require("dotenv").config();

const secret = process.env.secretToken || "34k82";
@injectable()
export class TokenService implements ITokenService {
  async generate(protectedData: any): Promise<Result> {
    try {
      const token = JWT.sign(protectedData, secret, {
        expiresIn: "1d",
        algorithm: "HS256",
      });
      return SuccessShared.successService({ token: token });
    } catch (error) {
      return ErrosShared.errorGenerateToken();
    }
  }
  async decode(token: string): Promise<Result> {
    try {
      const tokenPayload: any = JWT.verify(token, secret);
      return SuccessShared.successService(tokenPayload);
    } catch (error) {
      if (error instanceof JWT.TokenExpiredError) {
        return ErrosShared.errorTokenExpired();
      }

      return ErrosShared.errorDecodeToken();
    }
  }
}
