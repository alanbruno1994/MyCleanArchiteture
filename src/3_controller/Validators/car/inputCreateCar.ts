import { IsNumber, IsString, Min, MinLength } from "class-validator";
import { AbstractValidator } from "../abstractValidator";

type Input = {
  model: string;
  color: string;
  year: number;
};

export class InputCarCreate extends AbstractValidator<Input> {
  @IsString()
  @MinLength(3)
  model!: string;

  @IsString()
  @MinLength(3)
  color!: string;

  @IsNumber()
  @Min(1940)
  year!: number;
}
