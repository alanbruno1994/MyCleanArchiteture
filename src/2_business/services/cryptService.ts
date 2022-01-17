import { Result } from "../../shared/Result";
import "reflect-metadata";
export const ICryptServiceSymbol = Symbol.for("ICryptServiceSymbol");

export interface ICryptService {
  encrypt(input: string): Promise<Result>;
  compare(value: string, hash: string): Promise<Result>;
}
