import { IError } from "../../../../shared/IError";
import { NotFound } from "../../../../shared/PatternStatusCode";

export class ErrosCar {
  static errorCarNotFound() {
    return new IError(NotFound, "Not found car");
  }
}
