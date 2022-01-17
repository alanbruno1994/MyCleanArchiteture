import { IError } from "./IError";
import { ISuccess } from "./ISuccess";

export const isIError = (value: any) => {
  return value instanceof IError;
};

export const isSuccess = (value: any) => {
  return value instanceof ISuccess;
};

export type Result = IError<any> | ISuccess<any>;
