/* eslint-disable no-useless-constructor */
export class IError<T> {
  public body: T | undefined;
  constructor(
    public statusCode: number,
    public mensage: string,
    body: any = undefined
  ) {
    this.body = body;
  }
}
