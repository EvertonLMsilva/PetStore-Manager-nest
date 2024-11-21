import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { Application } from "src/auth/entities/application.entity"

export class CreateApplicationDto {
  @IsString()
  name: string;

  @IsString()
  clientId: string;

  @IsString()
  clientSecret: string;

  @IsString()
  idApplication: string;
}
