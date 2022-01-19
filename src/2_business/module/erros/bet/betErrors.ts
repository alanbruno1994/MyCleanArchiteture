import { IError } from "../../../../shared/IError";
import { NotFound } from "../../../../shared/PatternStatusCode";

export class ErrosBet {
  static errorBetNotFound() {
    return new IError(NotFound, "Not found bet!");
  }
}
