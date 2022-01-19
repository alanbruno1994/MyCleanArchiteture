import { IError } from "../../../../shared/IError";
import {
  DataInvalid,
  InternalServerError,
} from "../../../../shared/PatternStatusCode";

export class ErrosShared {
  static errorGenerateSecreteValeu() {
    return new IError(InternalServerError, "Not generate secret value");
  }

  static errorGenerateToken() {
    return new IError(InternalServerError, "Not generate token value");
  }

  static errorDecodeToken() {
    return new IError(InternalServerError, "Not possible decode token");
  }

  static errorNotUpload() {
    return new IError(InternalServerError, "Not possible upload file");
  }

  static errorTokenExpired() {
    return new IError(InternalServerError, "Token expired");
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
