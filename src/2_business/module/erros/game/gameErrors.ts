import { IError } from "../../../../shared/IError";
import { NotFound } from "../../../../shared/PatternStatusCode";

export class ErrosGame {
  static errorGameNotFound() {
    return new IError(NotFound, "Not found game!");
  }
}
