import { IsNumber, IsString, Min, MinLength } from "class-validator";
import { AbstractValidator } from "../abstractValidator";

type Input = {
  numberChoose: string;
  gameId: number;
};

export class InputBetCreate extends AbstractValidator<Input> {
  @IsString()
  @MinLength(2)
  numberChoose!: string;

  @IsNumber()
  @Min(1)
  gameId!: number;
}
