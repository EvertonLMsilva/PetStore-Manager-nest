import { Controller, Body, Post, Get, Param } from '@nestjs/common';
import { UserService } from 'src/auth/services/user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  async GetAllUser() {
    const findUser = await this.userService.GetAllUser();

    return findUser;
  }

  @Get('/:id')
  async GetUser(@Param("id") id: number) {
    const findUser = await this.userService.GetUser(id);

    return findUser;
  }
}
