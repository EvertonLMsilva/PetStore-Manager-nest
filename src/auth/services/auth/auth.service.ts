import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GetAuthDto } from 'src/auth/dtos/user/GetUser.dto';
import { AuthenticationProvider } from '../../providers/authentication.provider';

type ResponseAuth = {
  accessToken: string;
  refreshToken: string;
  idToken: string;
  expiresIn: number;
}
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private authRepository: Repository<UserEntity>,
    private readonly authenticationService: AuthenticationProvider
  ) { }


  async GenerateAccessToken(user: GetAuthDto): Promise<ResponseAuth> {
    const { username, password } = user;

    let getUser = await this.authRepository.findOne({
      where: {
        email: username
      },
    });

    if (getUser) {
      const getAccessToken = await this.authenticationService.AccessUserToken({
        clientId: getUser?.clientId,
        username,
        password
      });

      return getAccessToken;
    }

    getUser = await this.authenticationService.getUserByEmail(username);
    if (!getUser) {
      throw new BadRequestException('Unauthorized user', {
        cause: new Error(),
        description: 'Enter a valid username and password',
      })
    }

    console.log("Line: 49 ===> ", getUser);




    // const findOrganizationAuthentication = await this.authenticationService.findOrganizationAuthentication(getUser.organization.organizationName)
    // console.log("Line: 40 authService ===> ", findOrganizationAuthentication);

    // return findOrganizationAuthentication
    // return getUser
  }
}
