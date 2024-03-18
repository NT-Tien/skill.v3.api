import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import admin from "../../config/firebase.credential";
import { AuthServiceInterface } from "./interfaces/auth.service.interface";
import { PayloadTokenDto } from "./interfaces/dto/payload-token.dto";
import { RegisterDataDto } from "./interfaces/dto/register-data.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { AccountEntity } from "src/entities/account.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { AdminUpdateAccountDataDto } from "./interfaces/dto/admin-update-data.dto";
import { PhoneDto } from "./interfaces/dto/phone.dto";


@Injectable()
export class AuthService implements AuthServiceInterface {

    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(AccountEntity) private readonly repositoryAccount: Repository<AccountEntity>,
    ) { }
    async hashPassword(password: string): Promise<string> {
        var salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    }
    async register(data: RegisterDataDto): Promise<any> {
        data.password = await this.hashPassword(data.password);
        return this.repositoryAccount.save(data);
    }
    async login(email: string, password: string): Promise<any> {
        var account = await this.repositoryAccount.findOne({ where: { email: email } });
        if (!account) throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
        if (!bcrypt.compareSync(password, account.password)) throw new HttpException('Password not match', HttpStatus.BAD_REQUEST);
        return this.generateToken({ id: account.id, username: account.username, email: account.email, role: account.role });
    }
    async loginWithFirebaseToken(token: string): Promise<any> {
        try {
            const decodedToken = await admin.auth().verifyIdToken(token);
            if (decodedToken.email_verified) {
                var account = await this.repositoryAccount.findOne({ where: { email: decodedToken.email } });
                if (!account) throw new HttpException("Account info is not valid", HttpStatus.BAD_REQUEST);
                return this.generateToken({ id: account.id, username: account.username, email: account.email, role: account.role });
            }
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }
    async generateToken(payload: PayloadTokenDto): Promise<string> {
        return await this.jwtService.signAsync(payload);
    }
    async verifyToken(token: string): Promise<boolean> {
        if (!token) {
            throw new HttpException("Token is required", HttpStatus.BAD_REQUEST);
        }
        const decodedToken = await this.decodeToken(token);
        if (decodedToken.email && decodedToken.exp < Date.now()) {
            var account = await this.repositoryAccount.findOne({ where: { email: decodedToken.email } });
            if (account.email === decodedToken.email) {
                return true;
            }
        }
    }
    async verifyAdminToken(token: string): Promise<boolean> {
        if (!token) throw new HttpException("Token is required", HttpStatus.BAD_REQUEST);
        const decodedToken = await this.decodeToken(token);
        if (decodedToken.email && decodedToken.exp < Date.now()) {
            var account = await this.repositoryAccount.findOne({ where: { email: decodedToken.email } });
            if (account.email === decodedToken.email && account.role === "admin") return true;
        }
        return false;
    }
    async decodeToken(token: string): Promise<PayloadTokenDto> {
        return await this.jwtService.verifyAsync(token);
    }
    // ! features for admin
    async createAccount(data: RegisterDataDto): Promise<any> {
        data.password = await this.hashPassword(data.password);
        return this.repositoryAccount.save(data);
    }
    async updateAccount(id: string, data: AdminUpdateAccountDataDto): Promise<any> {
        var dataUpdate = {
            ...data,
            password: await this.hashPassword(data.password)
        }
        return this.repositoryAccount.update(id, dataUpdate);
    }
    async softDeleteAccount(id: string): Promise<any> {
        return this.repositoryAccount.update(id, { deletedAt: new Date() });
    }
    // ! features for user
    async changePassword(id: string, newPassword: string): Promise<any> {
        var salt = bcrypt.genSaltSync(10);
        newPassword = bcrypt.hashSync(newPassword, salt);
        return this.repositoryAccount.update(id, { password: newPassword });
    }
    async changePhoneNumber(id: string, newPhone: PhoneDto): Promise<any> {
        return this.repositoryAccount.update(id, {
            phone: newPhone.value
        });
    }
    async changeUsername(id: string, newUsername: string): Promise<any> {
        return this.repositoryAccount.update(id, {
            username: newUsername
        });
    }

}