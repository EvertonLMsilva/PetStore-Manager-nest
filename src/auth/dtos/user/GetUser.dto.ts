import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator"

export class GetAuthDto {
  @IsEmail()
  @IsNotEmpty()
  username: string

  @IsString()
  @IsNotEmpty()
  password: string
}
