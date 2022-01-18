import { IError } from "../../../../shared/IError";
import {
  DataInvalid,
  InternalServerError,
} from "../../../../shared/PatternStatusCode";

export class ErrosShared {
  static errorGenerateSecreteValeu() {
    return new IError(InternalServerError, "Not generate secret value");
  }
  static errorGenerateIdentifierService() {
    return new IError(InternalServerError, "Not generate identifier unique");
  }

  static errorNotSendEmail() {
    return new IError(InternalServerError, "Not send Email");
  }

  static errorNotPossibleComparer2Data() {
    return new IError(InternalServerError, "Not possible compare two data");
  }

  static errorInternalServerError() {
    return new IError(InternalServerError, "Internal Server Error");
  }

  static errorValidateError(error: any) {
    return new IError(DataInvalid, "Error Validate", error);
  }
}
