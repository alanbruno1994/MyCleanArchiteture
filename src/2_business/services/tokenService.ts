import { Result } from "../../shared/Result";
import "reflect-metadata";
export const ITokenServiceSymbol = Symbol.for("ITokenServiceSymbol");

export interface ITokenService {
  generate(protectedData: any): Promise<Result>;
  decode(token: string): Promise<Result>;
}
