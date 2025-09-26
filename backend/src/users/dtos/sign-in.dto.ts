// backend/src/users/dtos/sign-in.dto.ts
import { IsEmail, IsNotEmpty, IsString, ValidateIf } from "class-validator";

export class SignInDto {
  @ValidateIf(({ email }) => !email)
  @IsString()
  @IsNotEmpty()
  username?: string;

  @ValidateIf(({ username }) => !username)
  @IsEmail()
  @IsNotEmpty()
  email?: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
