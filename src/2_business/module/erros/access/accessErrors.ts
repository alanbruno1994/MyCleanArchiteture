import { IError } from "../../../../shared/IError";

export class ErrosAccessProfile {
  static errorAccessProfileNotFound() {
    return new IError(500, "Not found access profile");
  }
}
