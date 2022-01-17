import { IError } from "../../../../shared/IError";

export class ErrosCar {
  static errorCarNotFound() {
    return new IError(500, "Not found car");
  }
}
