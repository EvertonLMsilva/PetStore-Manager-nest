import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    // private readonly httpService: HttpService,
  ) { }

  async GetAllUser(): Promise<UserEntity[]> {
    const resolve = await this.userRepository.find();

    return resolve
  }

  async GetUser(id: number): Promise<UserEntity> {
    const resolve = await this.userRepository.findOne({
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
