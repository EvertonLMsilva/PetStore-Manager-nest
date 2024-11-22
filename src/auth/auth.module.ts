import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthController } from './controllers/auth/auth.controller';
import { HttpModule } from '@nestjs/axios';
import { LoggerMiddleware } from 'src/middleware/logger.middleware';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserController } from './controllers/user/user.controller';
import { UserService } from './services/user/user.service';
import configuration from 'src/config/configuration';
import { AuthenticationProvider } from './providers/authentication.provider';
import { AuthService } from './services/auth/auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    ConfigModule.forRoot({
      load: [configuration],
    }),
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
  ],
  controllers: [
    AuthController,
    UserController,
  ],
  providers: [
    UserService,
    AuthService,
    AuthenticationProvider
  ]
})

export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'auth/*', method: RequestMethod.ALL });
  }
}
