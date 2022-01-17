import {
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from "class-validator";
import { AbstractValidator } from "../abstractValidator";

type Input = {
  type: string;
  color: string;
  price: number;
  range: number;
  maxNumber: number;
};

export class InputUpdateGame extends AbstractValidator<Input> {
  @IsString()
  @MinLength(3)
  @IsOptional()
  type?: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  color?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  price?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  range?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  maxNumber?: number;
}
