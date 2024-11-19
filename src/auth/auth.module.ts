import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthController } from './controllers/auth/auth.controller';
import { HttpModule } from '@nestjs/axios';
import { ApplicationService } from './services/application/application.service';
import { AuthService } from './services/auth/auth.service';
import { UserController } from './controllers/user/user.controller';
import { ApplicationController } from './controllers/Application/Application.controller';
import { LoggerMiddleware } from 'src/middleware/logger.middleware';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from 'src/config/configuration';
import { Auth } from './entities/auth.entity';
import { Application } from './entities/application.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
    TypeOrmModule.forFeature([Auth, Application]),
  ],
  controllers: [
    AuthController,
    UserController,
    ApplicationController,
  ],
  providers: [
    AuthService,
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
