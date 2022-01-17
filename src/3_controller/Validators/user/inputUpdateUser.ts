import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from "class-validator";
import { AbstractValidator } from "../abstractValidator";

type Input = {
  email: string;
  password: string;
  name: string;
  accessProfileId: number;
  carId: number;
};

export class InputUpdateUser extends AbstractValidator<Input> {
  @IsString()
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @MinLength(15)
  @IsOptional()
  name?: string;

  @IsString()
  @MinLength(8)
  @IsOptional()
  password?: string;

  @IsNumber()
  @Min(1)
  @IsOptional()
  carId?: number;

  @IsNumber()
  @Min(1)
  @IsOptional()
  accessProfileId?: number;
}
