import { injectable } from "inversify";
@injectable()
export abstract class AbstractUseCase<T, K> {
  abstract run(input: T, ...elements: any[]): Promise<K>;
}
