import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module';
import { HttpModule } from '@nestjs/axios';
import { DatabaseModule } from './database/database.module';

@Module({
    imports: [
        AuthModule, 
        HttpModule, DatabaseModule
    ] 
})

export class AppModule { }
