import {
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from "class-validator";
import { AbstractValidator } from "../abstractValidator";

type Input = {
  model: string;
  color: string;
  year: number;
};

export class InputCarUpdate extends AbstractValidator<Input> {
  @IsString()
  @MinLength(3)
  @IsOptional()
  model?: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  color?: string;

  @IsNumber()
  @Min(1940)
  @IsOptional()
  year?: number;
}
