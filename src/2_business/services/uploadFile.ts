import { Result } from "../../shared/Result";
import "reflect-metadata";
export const IUploadFileSymbol = Symbol.for("IUploadFileSymbol");

export interface IUploadFile {
  upload(file: any): Promise<Result>;
}
