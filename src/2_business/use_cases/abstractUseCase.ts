import { Result } from "../../shared/Result";
import { injectable } from "inversify";
@injectable()
export abstract class AbstractUseCase<T> {
  abstract run(input: T, ...elements: any[]): Promise<Result>;
}
