import {
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from "class-validator";
import { AbstractValidator } from "../abstractValidator";

type Input = {
  numberChoose: string;
  gameId: number;
  userId: number;
  priceGame: number;
};

export class InputBetUpdate extends AbstractValidator<Input> {
  @IsString()
  @MinLength(2)
  @IsOptional()
  numberChoose?: string;

  @IsNumber()
  @Min(1)
  @IsOptional()
  gameId?: number;

  @IsNumber()
  @Min(1)
  @IsOptional()
  userId?: number;

  @IsNumber()
  @Min(1)
  @IsOptional()
  priceGame?: number;
}
