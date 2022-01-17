import { Result } from "../../shared/Result";
import "reflect-metadata";
export const IUniqueIdentifierServiceSymbol = Symbol.for(
  "IUniqueIdentifierServiceSymbol"
);
export interface IUniqueIdentifierService {
  generate(): Promise<Result>;
}
