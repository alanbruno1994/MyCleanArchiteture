import { ISuccess } from "../../../../shared/ISuccess";
import {
  DataCreatedSuccess,
  OperationBeenSucceeded,
} from "../../../../shared/PatternStatusCode";

export class SuccessShared {
  static successRegister(body: any) {
    return new ISuccess(DataCreatedSuccess, body);
  }

  static successFind(body: any) {
    return new ISuccess(OperationBeenSucceeded, body);
  }

  static successUpdate(body: any) {
    return new ISuccess(OperationBeenSucceeded, body);
  }

  static successDelete(body: any) {
    return new ISuccess(OperationBeenSucceeded, body);
  }

  static successService(body: any = undefined) {
    return new ISuccess(OperationBeenSucceeded, body);
  }
}
