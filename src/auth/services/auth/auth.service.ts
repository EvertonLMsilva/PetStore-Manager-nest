import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/auth/dtos/user/CreateUser.dto';
import { GetAuthDto } from 'src/auth/dtos/user/GetUser.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private authRepository: Repository<User>,
    // private readonly httpService: HttpService,
  ) { }

  async GetAuth(user: GetAuthDto): Promise<User> {
    const { username, password } = user;
    const resolve = await this.authRepository.findOneBy({
      email: username
    });

    return resolve
  }

  async GetUser(id: number): Promise<User> {
    const resolve = await this.authRepository.findOne({
      where: { id }
    });

    return resolve
  }

  //   async createUser(user: CreateUserDto): Promise<Auth> {
  //   //   const newUser = new Auth();

  //   //   newUser.email = user.email;
  //   //   newUser.idApplication = user.idApplication;


  //   //   return resolve
  //   // }

}
