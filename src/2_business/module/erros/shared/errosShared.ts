import { IError } from "../../../../shared/IError";

export class ErrosShared {
  static errorGenerateSecreteValeu() {
    return new IError(500, "Not generate secret value");
  }
  static errorGenerateIdentifierService() {
    return new IError(500, "Not generate identifier unique");
  }

  static errorNotSendEmail() {
    return new IError(500, "Not send Email");
  }

  static errorNotPossibleComparer2Data() {
    return new IError(500, "Not possible compare two data");
  }

  static errorInternalServerError() {
    return new IError(500, "Internal Server Error");
  }

  static errorValidateError(error: any) {
    return new IError(400, "Error Validate", error);
  }
}
