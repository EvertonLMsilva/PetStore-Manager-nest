// import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Application } from 'src/auth/entities/application.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
    // private http: HttpService,
  ) { }

  async findAll(): Promise<Application[]> {
    return this.applicationRepository.find();
  }
}
