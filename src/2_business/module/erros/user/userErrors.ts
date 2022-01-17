import { IError } from "../../../../shared/IError";

export class ErrosUser {
  static errorUserNotFound() {
    return new IError(500, "Not found user");
  }
}
