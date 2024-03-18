import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from 'src/entities/account.entity';
import { AuthController } from './auth.controller';

dotenv.config();

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET_KEY,
            signOptions: { expiresIn: '2h', algorithm: 'HS256' },
        }),
        TypeOrmModule.forFeature([AccountEntity]),
    ],
    controllers: [
        AuthController,
    ],
    providers: [
        {
            provide: 'AUTH_SERVICE_TIENNT',
            useClass: AuthService,
        }
    ],
    exports: [
        {
            provide: 'AUTH_SERVICE_TIENNT',
            useClass: AuthService,
        }
    ],
})
export class AuthModule { }
