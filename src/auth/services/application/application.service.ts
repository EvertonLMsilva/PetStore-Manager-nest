import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { Application } from 'src/auth/entities/application.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ApplicationService {
  constructor(
    @Inject('APPLICATION_REPOSITORY')
    private photoRepository: Repository<Application>,
    private http: HttpService,
  ) { }

  async findAll(): Promise<Application[]> {
    return this.photoRepository.find();
  }
}
