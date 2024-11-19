import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator"

export class LoginAuthDto {
  @IsEmail()
  @IsNotEmpty()
  username: string

  @IsString()
  @IsNotEmpty()
  password: string
}
