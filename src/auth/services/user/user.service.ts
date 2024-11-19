import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { Auth } from '../../entities/auth.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @Inject('APPLICATION_REPOSITORY')
    private photoRepository: Repository<Auth>,
    private http: HttpService,
  ) { }

  async findUser(): Promise<Auth[]> {
    return this.photoRepository.find();
  }

  login(user: any): String {
    return user
  }

  GetToken(user: any): String {
    console.log("User ===>", user);
    return user
  }
}
