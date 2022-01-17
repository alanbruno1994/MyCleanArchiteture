import { ISuccess } from "../../../../shared/ISuccess";

export class SuccessShared {
  static successRegister(body: any) {
    return new ISuccess(201, body);
  }

  static successFind(body: any) {
    return new ISuccess(200, body);
  }

  static successUpdate(body: any) {
    return new ISuccess(200, body);
  }

  static successDelete(body: any) {
    return new ISuccess(200, body);
  }

  static successService(body: any = undefined) {
    return new ISuccess(200, body);
  }
}
