
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

export const databaseProviders = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    type: configService.get<string>('DB_TYPE') as 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: parseInt(configService.get<string>('DB_PORT'), 10),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_NAME'),
    schema: configService.get<string>('DB_SCHEMA'),
    entities: [
      __dirname + '/../**/*.entity{.ts,.js}',
    ],
    synchronize: true,
    logging: true,
  }),
  inject: [ConfigService],

});
