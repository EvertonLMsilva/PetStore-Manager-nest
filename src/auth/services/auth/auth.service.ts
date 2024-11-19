import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Auth } from '../../entities/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
    // private readonly httpService: HttpService,
  ) { }

  async findUser(): Promise<Auth[]> {
    // this.httpService.axiosRef.get('http://localhost:3000/cats');
    return this.authRepository.find();
  }

  login(user: any): String {
    return user
  }

  GetToken(user: any): String {
    console.log("User ===>", user);
    return user
  }
}
