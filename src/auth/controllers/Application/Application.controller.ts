import { Controller, Body, Post, Get, Param } from '@nestjs/common';
import { ApplicationService } from 'src/auth/services/application/application.service';
import { CreateApplicationDto } from 'src/auth/dtos/application/CreateApplication.dto';
import { GetApplication } from 'src/auth/dtos/application/GetApplication.dto';

@Controller('application')
export class ApplicationController {
  constructor(private readonly authService: ApplicationService) { }

  @Get(':id')
  async findUser(@Param("id") id: number) {
    console.log("application ===>", id);
    const resolve = await this.authService.findUser(id);
    return resolve;
  }

  // @Post('application')
  // async createApplication(application: CreateApplicationDto) {
  //   console.log("application controller ==>", application);
  //   const resolve = await this.authService.createApplication(application);

  //   return resolve;
  // }
}
