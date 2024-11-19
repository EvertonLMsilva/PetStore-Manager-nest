import { Controller, Body, Post, Get } from '@nestjs/common';
import { LoginAuthDto } from './loginAuth.dto';
import { AuthService } from '../../services/auth/auth.service';
import { ValidationPipe } from '../../pipes/validation.pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('sign_in')
  async GetToken(@Body(new ValidationPipe()) user: LoginAuthDto) {
    console.log("User", user);

    const findUser = await this.authService.findUser()

    return { message: 'Este é um endpoint protegido', findUser };
  }
}
