import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { UserEntity } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

type ResponseUser = {
  accessToken: string;
  refreshToken: string;
  idToken: string;
  expiresIn: number;
}

type AccessUserToken = {
  username: string;
  password: string;
  clientId: string;
}

type InputOrganizationRepository = {
  organizationName: string;
  applicationName: string;
  clientId: string;
  clientSecret: string;
}

type InputUserRepository = {
  email: string;
  isActive: boolean;
  organization: InputOrganizationRepository;
}

@Injectable()
export class AuthenticationProvider {
  constructor(
    private readonly configModule: ConfigService,
    private readonly httpService: HttpService,
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
  ) {

    this.httpService.axiosRef.interceptors.request.use((config: any) => {
      config.baseURL = this.configModule.get("AUTH_SERVER_URL");
      config.timeout = 10000;
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      return config;
    });
  }

  // async authenticateUser(email: string, password: string): Promise<ResponseUser> {
  //   const accessTokenAdmin = await this.authenticateAdmin();
  //   const findUserRepository = await this.getUserByEmail(email, accessTokenAdmin);
  //   console.log("Line: 38 ==>", findUserRepository);

  //   if (!findUserRepository || findUserRepository.isDeleted) {
  //     throw new BadRequestException('Unauthorized user', {
  //       cause: new Error(),
  //       description: 'Account is disabled',
  //     })
  //   }

  //   let findOrganizationRepository = await this.findOrganizationRepository(findUserRepository.data.owner);
  //   console.log("Line: 54 ==>", findOrganizationRepository);

  //   if (!findOrganizationRepository) {
  //     const findOrganizationAuthentication = await this.findOrganizationAuthentication(findUserRepository.data.owner, accessTokenAdmin);

  //     findOrganizationRepository = await this.createOrganization(findOrganizationAuthentication)
  //   }

  //   const newUser = await this.createUser({
  //     email,
  //     isActive: !findUserRepository.data.isDeleted,
  //     organization: findOrganizationRepository
  //   });

  //   console.log("Line: 68 ==>", newUser);

  //   if (!findUserRepository.organization?.id) {
  //     throw new BadRequestException('Unauthorized user', {
  //       cause: new Error(),
  //       description: 'Enter a valid username and password',
  //     })
  //   }

  //   const response = await this.loginUser(email, password)

  //   return response;

  // }

  private async authenticateAdmin(): Promise<string> {
    try {
      const response = await firstValueFrom(this.httpService.post(`/login/oauth/access_token`, {
        grant_type: 'password',
        client_id: this.configModule.get("AUTH_CLIENT_ID"),
        client_secret: this.configModule.get("AUTH_CLIENT_SECRET"),
        username: this.configModule.get("AUTH_CLIENT_USERNAME"),
        password: this.configModule.get("AUTH_CLIENT_PASSWORD"),
      }))

      return response.data.access_token;
    } catch (error) {
      throw new InternalServerErrorException('Internal error - 001', {
        cause: new Error(),
        description: 'Please try again later',
      })
    }
  }

  async getUserByEmail(email: string): Promise<any> {
    try {
      const accessTokenAdmin = await this.authenticateAdmin();
      const resAuthentication = await firstValueFrom(
        this.httpService.get(`${this.configModule.get("AUTH_SERVER_URL")}/get-user`, {
          params: { email },
          headers: {
            Authorization: `Bearer ${accessTokenAdmin}`,
          },
        })
      ).then((res) => res.data);

      if (!resAuthentication.data) {
        return null
      }

      return {
        email: resAuthentication.data.email,
        isDeleted: resAuthentication.data.isDeleted,
        organization: {
          organizationName: resAuthentication.data.owner
        }
      };

    } catch (error) {
      throw new InternalServerErrorException('Internal error - 000', {
        cause: new Error(),
        description: 'Please try again later',
      })
    }
  }

  async AccessUserToken(access: AccessUserToken): Promise<ResponseUser> {
    try {
      const resAuthentication = await firstValueFrom(
        this.httpService.post(`${this.configModule.get("AUTH_SERVER_URL")}/login/oauth/access_token`, {
          grant_type: 'password',
          client_id: access.clientId,
          username: access.username,
          password: access.password,
        })
      ).then((res) => res.data);

      return {
        accessToken: resAuthentication.access_token,
        refreshToken: resAuthentication.refresh_token,
        idToken: resAuthentication.access_token,
        expiresIn: resAuthentication.expires_in,
      }

    } catch (error) {
      throw new BadRequestException("Unauthorized user", {
        cause: new Error(),
        description: 'Enter a valid username and password',
      })

    }
  }

  // private async loginUser(email: string, password: string): Promise<any> {
  //   try {
  //     const response = await this.httpService.post(`${this.configModule.get("AUTH_SERVER_URL")}/login`, {
  //       client_id: process.env.CASDOOR_CLIENT_ID,
  //       client_secret: process.env.CASDOOR_CLIENT_SECRET,
  //       email,
  //       password,
  //     });

  //     return {
  //       statusUser: "Ok",
  //       access_token: response.data.access_token,
  //       refresh_token: response.data.refresh_token,
  //     };

  //   } catch (error) {
  //     throw new InternalServerErrorException('Internal error - 000', {
  //       cause: new Error(),
  //       description: 'Please try again later',
  //     })
  //   }
  // }

  // async findOrganizationAuthentication(name: string): Promise<any> {
  //   try {
  //     const accessTokenAdmin = await this.authenticateAdmin();
  //     const response = await this.httpService.get(`${this.configModule.get("AUTH_SERVER_URL")}/get-organization-applications`, {
  //       params: { organization: name },
  //       headers: {
  //         Authorization: `Bearer ${accessTokenAdmin}`,
  //       }
  //     });

  //     const { data, status } = response.data;

  //     return {
  //       status,
  //       applicationName: data[0].name,
  //       organizationName: data[0].organization,
  //       clientId: data[0].clientId,
  //       clientSecret: data[0].clientSecret,
  //     };

  //   } catch (error) {
  //     throw new InternalServerErrorException('Internal error - 002', {
  //       cause: new Error(),
  //       description: 'Please try again later',
  //     })
  //   }
  // }

  // private async findUserRepository(email: string): Promise<UserEntity> {
  //   const response = await this.userRepository.findOne({
  //     where: { email }
  //   });
  //   return response;
  // }

  // private async createUser(user: InputUserRepository): Promise<any> {
  //   const response = this.userRepository.create(user);
  //   const saveUser = await this.userRepository.save(response);

  //   return saveUser;
  // }
}
