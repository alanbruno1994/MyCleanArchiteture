export class ISuccess<T> {
  public body: T | undefined;
  constructor(
    public statusCode: number,
    body: any = undefined,
    public mensage: string = ""
  ) {
    this.body = body;
  }
}
