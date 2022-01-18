import { IError } from "../../../../shared/IError";
import { NotFound } from "../../../../shared/PatternStatusCode";

export class ErrosAccessProfile {
  static errorAccessProfileNotFound() {
    return new IError(NotFound, "Not found access profile");
  }
}
