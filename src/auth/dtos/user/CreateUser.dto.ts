import { IsBoolean, IsEmail, IsNotEmpty, IsString } from "class-validator"
import { Application } from "src/auth/entities/application.entity"

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
