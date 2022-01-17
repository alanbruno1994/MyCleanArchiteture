import { Result } from "../../shared/Result";
import "reflect-metadata";
export type Input = {
  payload: any;
  subject: string;
  templateHTML: string;
  to: string;
};
export const IMailServiceSymbol = Symbol.for("IMailServiceSymbol");
export interface IMailService {
  send(input: Input): Promise<Result>;
}
