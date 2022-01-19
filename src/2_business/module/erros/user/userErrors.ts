import { IError } from "../../../../shared/IError";
import {
  DataInvalid,
  NotAuhtorized,
  NotFound,
} from "../../../../shared/PatternStatusCode";

export class ErrosUser {
  static errorUserNotFound() {
    return new IError(NotFound, "Not found user");
  }

  static errorUserEmailIsAreadyUse() {
    return new IError(DataInvalid, "Email is already in use!");
  }

  static errorUserNotFoundMiddlewareAccess() {
    return new IError(NotFound, "Not found user for access to system");
  }

  static errorUserNotAuthorized() {
    return new IError(NotAuhtorized, "Not authorized access");
  }
}
