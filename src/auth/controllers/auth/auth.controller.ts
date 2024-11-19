import { Controller, Body, Post, Get } from '@nestjs/common';
import { LoginAuthDto } from './loginAuth.dto';
import { AuthService } from '../../services/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('sign_in')
  GetToken(@Body() user: LoginAuthDto) {
    console.log("User", user);


    return { message: 'Este é um endpoint protegido' };
  }
}
