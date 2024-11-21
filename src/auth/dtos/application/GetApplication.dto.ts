import { IsEmail, IsNotEmpty, isNumber, IsString, MaxLength } from "class-validator"

export class GetApplication {
  @IsNotEmpty()
  id: number
}
