import { IsEmail, IsString, MinLength } from "class-validator";
import { AbstractValidator } from "../abstractValidator";

type Input = {
  email: string;
  password: string;
};

export class InputLogin extends AbstractValidator<Input> {
  @IsString()
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  password!: string;
}
