import { Controller, Body, Post, Get } from '@nestjs/common';
import { LoginAuthDto } from '../auth/loginAuth.dto';
import { AuthService } from '../../services/auth/auth.service';

@Controller('auth')
export class ApplicationController {
  constructor(private readonly authService: AuthService) { }

  @Post('user')
  GetToken(@Body() user: LoginAuthDto) {
    console.log("User", user);

    return { message: 'Este é um endpoint protegido' };
  }

  @Get('user')
  findUser(user: LoginAuthDto) {
    console.log("User", user);

    return { message: 'Este é um endpoint protegido 1' };
  }
}
