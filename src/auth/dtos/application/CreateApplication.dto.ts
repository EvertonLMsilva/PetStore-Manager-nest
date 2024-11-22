import { IsString } from "class-validator"

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
