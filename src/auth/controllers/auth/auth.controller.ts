import { Controller, Body, Post, Get, Param } from '@nestjs/common';
import { ValidationPipe } from '../../pipes/validation.pipe';
import { GetAuthDto } from 'src/auth/dtos/user/GetUser.dto';
import { AuthService } from 'src/auth/services/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @Post('sign_in')
  async GetToken(@Body(new ValidationPipe()) user: GetAuthDto) {
    const findUser = await this.authService.GetAuth(user);

    return findUser;
  }
}
