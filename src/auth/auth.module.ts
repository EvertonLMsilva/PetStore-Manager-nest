import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthController } from './controllers/auth/auth.controller';
import { HttpModule } from '@nestjs/axios';
import { ApplicationService } from './services/application/application.service';
import { ApplicationController } from './controllers/application/Application.controller';
import { LoggerMiddleware } from 'src/middleware/logger.middleware';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from 'src/config/configuration';
import { User } from './entities/user.entity';
import { Application } from './entities/application.entity';
import { UserController } from './controllers/user/user.controller';
import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Application]),
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
    ApplicationController,
  ],
  providers: [
    AuthService,
    UserService,
    ApplicationService,
  ]
})

export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'auth/*', method: RequestMethod.ALL });
  }
}
