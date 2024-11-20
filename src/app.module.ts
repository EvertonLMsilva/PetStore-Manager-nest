import { Module } from '@nestjs/common'
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ValidationPipe } from './auth/pipes/validation.pipe';
import configuration from './config/configuration';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { databaseProviders } from './providers/database.provider';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    databaseProviders,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})

export class AppModule {
  constructor(private dataSource: DataSource) { }
} 
