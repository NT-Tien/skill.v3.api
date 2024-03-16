import { HttpException, Inject, Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import admin from "../../config/firebase.credential";
import { AuthInterface } from "./interfaces/auth.interface";
import { PayloadTokenDto } from "./interfaces/dto/payload-token.dto";
import { RegisterDataDto } from "./interfaces/dto/register-data.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { AccountEntity } from "src/entities/account.entity";
import { Repository } from "typeorm";

@Injectable()
export class AuthService implements AuthInterface{

    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(AccountEntity) private readonly repositoryVoucher: Repository<AccountEntity>,
    ) { }

    register(data: RegisterDataDto): Promise<any> {
        throw new Error("Method not implemented.");
    }
    login(email: string, password: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    generateToken(payload: PayloadTokenDto): Promise<string> {
        throw new Error("Method not implemented.");
    }
    verifyToken(token: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    verifyAdminToken(token: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    verifyFirebaseToken(token: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    decodeToken(token: string): Promise<PayloadTokenDto> {
        throw new Error("Method not implemented.");
    }

}