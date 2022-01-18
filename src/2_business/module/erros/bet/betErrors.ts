import { IError } from "../../../../shared/IError";
import { NotFound } from "../../../../shared/PatternStatusCode";

export class ErrosAccessProfile {
  static errorBetNotFound() {
    return new IError(NotFound, "Not found bet!");
  }
}
