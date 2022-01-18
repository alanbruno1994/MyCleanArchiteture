import { Result } from "../../shared/Result";

export const IUploadFileSymbol = Symbol.for("IUploadFileSymbol");

export interface IUploadFile {
  upload(file: any): Promise<Result>;
}
