import { IsBoolean, IsEmail, IsNotEmpty } from "class-validator"

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  idApplication: number

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean
}
