import { Result } from "../../shared/Result";
import { injectable } from "inversify";
@injectable()
export abstract class AbstractController {
  abstract run(...input: any[]): Promise<Result>;
}
