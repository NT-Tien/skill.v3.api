import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import admin from "../../config/firebase.credential";
import { AuthServiceInterface } from "./interfaces/auth.service.interface";
import { PayloadTokenDto } from "./dto/payload-token.dto";
import { RegisterDataDto } from "./dto/register-data.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { AdminUpdateAccountDataDto } from "./dto/admin-update-data.dto";
import { PhoneDto } from "./dto/phone.dto";
import { PasswordDto } from "./dto/password-update-data.dto";
import { UsernameDto } from "./dto/username-update-data.dto";
import { CreateAccountDto } from "./dto/create-account.dto";
import { AccountEntity, Role } from "./entities/account.entity";
import { randomUUID } from "crypto";


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
        // check email is exist
        var account = await this.repositoryAccount.findOne({ where: { email: data.email } });
        if (account) throw new HttpException('Email is exist', HttpStatus.BAD_REQUEST);
        data.password = await this.hashPassword(data.password);
        return this.repositoryAccount.save(data);
    }
    async login(email: string, password: string): Promise<any> {
        var account = await this.repositoryAccount.findOne({ where: { email: email } });
        if (!account) throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
        if (!bcrypt.compareSync(password, account.password) || account.deletedAt != null) throw new HttpException('Account info is not valid', HttpStatus.BAD_REQUEST);
        return this.generateToken({ id: account.id, username: account.username, email: account.email, role: account.role });
    }
    async loginWithFirebaseToken(token: string): Promise<any> {
        try {
            const decodedToken = await admin.auth().verifyIdToken(token);
            if (decodedToken.email_verified) {
                var account = await this.repositoryAccount.findOne({ where: { email: decodedToken.email } });
                if (!account) {
                    var data = {
                        email: decodedToken.email,
                        username: decodedToken.name,
                        password: await this.hashPassword(randomUUID()),
                        role: Role.user
                    }
                    await this.repositoryAccount.save(data);
                    var newAccount = await this.repositoryAccount.findOne({ where: { email: decodedToken.email } });
                    return this.generateToken({ id: newAccount.id, username: newAccount.username, email: newAccount.email, role: newAccount.role });
                }
                else if (account.deletedAt != null) throw new HttpException("Account info is not valid", HttpStatus.BAD_REQUEST);
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
            if (account.email === decodedToken.email && account.deletedAt == null) {
                return true;
            }
        }
    }
    async verifyUserToken(token: string): Promise<boolean> {
        if (!token) throw new HttpException("Token is required", HttpStatus.BAD_REQUEST);
        const decodedToken = await this.decodeToken(token);
        if (decodedToken.email && decodedToken.exp < Date.now()) {
            var account = await this.repositoryAccount.findOne({ where: { email: decodedToken.email } });
            if (account.email === decodedToken.email && account.role === "user" && account.deletedAt == null) return true;
        }
        return false;
    }
    async verifyAdminToken(token: string): Promise<boolean> {
        if (!token) throw new HttpException("Token is required", HttpStatus.BAD_REQUEST);
        const decodedToken = await this.decodeToken(token);
        if (decodedToken.email && decodedToken.exp < Date.now()) {
            var account = await this.repositoryAccount.findOne({ where: { email: decodedToken.email } });
            if (account.email === decodedToken.email && account.role === "admin" && account.deletedAt == null) return true;
        }
        return false;
    }
    async decodeToken(token: string): Promise<PayloadTokenDto> {
        return await this.jwtService.verifyAsync(token);
    }
    // ! features for admin
    async getAllAccounts(): Promise<any> {
        return this.repositoryAccount.find();
    }
    async createAccount(data: CreateAccountDto): Promise<any> {
        // block admin account to create another admin account
        if (data.role === Role.admin) {
            throw new HttpException("Admin account can't create another admin account", HttpStatus.BAD_REQUEST);
        }
        // check email is exist
        var account = await this.repositoryAccount.findOne({ where: { email: data.email } });
        if (account) throw new HttpException('Email is exist', HttpStatus.BAD_REQUEST);
        data.password = await this.hashPassword(data.password);
        return this.repositoryAccount.save(data);
    }
    async updateAccount(id: string, data: AdminUpdateAccountDataDto): Promise<any> {
        // block admin account to update another admin account
        var account = await this.repositoryAccount.findOne({ where: { id: id } });
        if (account.role === "admin" && data.role !== "admin") {
            throw new HttpException("Admin account can't update another admin account", HttpStatus.BAD_REQUEST);
        }
        var dataUpdate = {
            ...data,
            password: await this.hashPassword(data.password)
        }
        return this.repositoryAccount.update(id, dataUpdate);
    }
    async softDeleteAccount(id: string): Promise<any> {
        // block admin account to delete another admin account
        var account = await this.repositoryAccount.findOne({ where: { id: id } });
        if (account.role === "admin") {
            throw new HttpException("Admin account can't delete another admin account", HttpStatus.BAD_REQUEST);
        }
        return this.repositoryAccount.update(id, { deletedAt: new Date() });
    }
    // ! features for user
    async changePassword(id: string, newPassword: PasswordDto): Promise<any> {
        var salt = bcrypt.genSaltSync(10);
        newPassword.value = bcrypt.hashSync(newPassword.value, salt);
        return this.repositoryAccount.update(id, { password: newPassword.value });
    }
    async changePhoneNumber(id: string, newPhone: PhoneDto): Promise<any> {
        return this.repositoryAccount.update(id, {
            phone: newPhone.value
        });
    }
    async changeUsername(id: string, newUsername: UsernameDto): Promise<any> {
        return this.repositoryAccount.update(id, {
            username: newUsername.value
        });
    }

}