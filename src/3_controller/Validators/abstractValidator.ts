import { validateSync as exec } from "class-validator";

export abstract class AbstractValidator<I> {
  constructor(value: Partial<I>) {
    Object.assign(this, value);
  }

  validate(): void {
    const errors = exec(this);
    if (errors.length > 0) {
      throw errors;
    }
  }
}
