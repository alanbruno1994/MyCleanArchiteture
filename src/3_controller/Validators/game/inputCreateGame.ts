import { IsNumber, IsString, Min, MinLength } from "class-validator";
import { AbstractValidator } from "../abstractValidator";

type Input = {
  type: string;
  color: string;
  price: number;
  range: number;
  maxNumber: number;
};

export class InputGameCreate extends AbstractValidator<Input> {
  @IsString()
  @MinLength(3)
  type!: string;

  @IsString()
  @MinLength(3)
  color!: string;

  @IsNumber()
  @Min(0)
  price!: number;

  @IsNumber()
  @Min(0)
  range!: number;

  @IsNumber()
  @Min(0)
  maxNumber!: number;
}
