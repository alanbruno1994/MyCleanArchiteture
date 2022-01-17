import { IsString, MinLength } from "class-validator";
import { AbstractValidator } from "../abstractValidator";

type Input = {
  level: string;
};

export class InputAccessCreate extends AbstractValidator<Input> {
  @IsString()
  @MinLength(3)
  level!: string;
}
