// backend/src/users/dtos/sign-in.dto.ts
import { IsNotEmpty, IsString } from "class-validator";
import { Transform } from "class-transformer";

export class SignInDto {
  @IsString()
  @IsNotEmpty({ message: "Informe e-mail ou username" })
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  identifier: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
