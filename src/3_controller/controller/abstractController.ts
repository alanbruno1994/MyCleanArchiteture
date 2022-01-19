import { Result } from "../../shared/Result";
import { injectable } from "inversify";
import "reflect-metadata";
@injectable()
export abstract class AbstractController {
  abstract run(...input: any[]): Promise<Result>;
}
