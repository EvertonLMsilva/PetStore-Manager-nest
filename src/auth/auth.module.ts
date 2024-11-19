import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthController } from './controllers/auth/auth.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/database/database.module';
import { ApplicationService } from './services/application/application.service';
import { AuthService } from './services/auth/auth.service';
import { authProviders } from './providers/auth.providers';
import { applicationProviders } from './providers/application.providers';
import { UserController } from './controllers/user/user.controller';
import { ApplicationController } from './controllers/Application/Application.controller';
import { UserService } from './services/user/user.service';
import { LoggerMiddleware } from 'src/middleware/logger.middleware';

@Module({
  imports: [
    DatabaseModule,
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
    ConfigModule.forRoot()
  ],
  controllers: [
    AuthController,
    UserController,
    ApplicationController,
  ],
  providers: [
    ...authProviders,
    ...applicationProviders,
    AuthService,
    ApplicationService,
    UserService,


  ],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'auth/*', method: RequestMethod.ALL });
  }
}
