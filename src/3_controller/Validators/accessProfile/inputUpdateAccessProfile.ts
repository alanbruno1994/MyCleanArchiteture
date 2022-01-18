import { IsOptional, IsString, MinLength } from "class-validator";
import { AbstractValidator } from "../abstractValidator";

type Input = {
  level: string;
};

export class InputAccessProfileUpdate extends AbstractValidator<Input> {
  @IsString()
  @MinLength(3)
  @IsOptional()
  level?: string;
}
