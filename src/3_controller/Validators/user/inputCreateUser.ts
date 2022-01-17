import { IsEmail, IsNumber, IsString, MinLength } from "class-validator";
import { AbstractValidator } from "../abstractValidator";

type InputUser = {
  email: string;
  password: string;
  name: string;
  carId: number;
};

export class InputCreateUser extends AbstractValidator<InputUser> {
  @IsString()
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(15)
  name!: string;

  @IsString()
  @MinLength(8)
  password!: string;

  @IsNumber()
  carId!: number;
}
