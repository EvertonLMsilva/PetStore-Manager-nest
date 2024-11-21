// import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateApplicationDto } from 'src/auth/dtos/application/CreateApplication.dto';
import { Application } from 'src/auth/entities/application.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
    // private http: HttpService,
  ) { }

  async findUser(id?: number): Promise<Application> {
    const resolve = await this.applicationRepository.findOneBy({ id });

    console.log("findUser ===>", id);
    return resolve
  }

  // async createApplication(application: CreateApplicationDto): Promise<Application> {
  //   const resolve = await this.applicationRepository.findOne({ id });

  //   return resolve
  // }
}
