import { Body, Controller, Delete, Get, Headers, HttpCode, HttpStatus, Inject, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UserGuard } from "./guards/user.guard";
import { RegisterDataDto } from "./dto/register-data.dto";
import { LoginLocalDataDto } from "./dto/login-data";
import { AdminGuard } from "./guards/admin.guard";
import { AdminUpdateAccountDataDto } from "./dto/admin-update-data.dto";
import { PhoneDto } from "./dto/phone.dto";
import { PasswordDto } from "./dto/password-update-data.dto";
import { FastifyRequest } from "fastify";
import { UsernameDto } from "./dto/username-update-data.dto";
import { CreateAccountDto } from "./dto/create-account.dto";
import { AuthServiceInterface } from "./interfaces/auth.service.interface";

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(
        @Inject('AUTH_SERVICE_TIENNT') private readonly authService: AuthServiceInterface,
    ) { }

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() data: RegisterDataDto) {
        return await this.authService.register(RegisterDataDto.plainToClass(data));
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() data: LoginLocalDataDto) {
        return await this.authService.login(data.email, data.password);
    }

    @Post('login-firebase')
    @HttpCode(HttpStatus.OK)
    async loginWithFirebaseToken(@Headers('authorization') token: string) {
        return await this.authService.loginWithFirebaseToken(token);
    }

    @ApiBearerAuth()
    @Post('verify-token')
    @HttpCode(HttpStatus.OK)
    async verifyToken(@Req() req: FastifyRequest['raw']) {
        var token = req.headers.authorization?.split(' ')[1];
        return await this.authService.verifyToken(token);
    }

    @ApiBearerAuth()
    @Post('verify-admin-token')
    @HttpCode(HttpStatus.OK)
    async verifyAdminToken(@Req() req: FastifyRequest['raw']) {
        var token = req.headers.authorization?.split(' ')[1];
        return await this.authService.verifyAdminToken(token);
    }

    // ! apis for admin

    @Get('admin/all-accounts')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AdminGuard)
    @ApiBearerAuth()
    async getAllAccounts() {
        return await this.authService.getAllAccounts();
    }

    @Post('admin/create-account')
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(AdminGuard)
    @ApiBearerAuth()
    async createAccount(@Body() data: CreateAccountDto) {
        return await this.authService.createAccount(CreateAccountDto.plainToClass(data));
    }

    @Put('admin/update-account/:id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AdminGuard)
    @ApiBearerAuth()
    async updateAccount(@Param('id') id: string, @Body() data: AdminUpdateAccountDataDto) {
        return await this.authService.updateAccount(id, data);
    }

    @Delete('admin/delete-account/:id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AdminGuard)
    @ApiBearerAuth()
    async deleteAccount(@Param('id') id: string) {
        return await this.authService.softDeleteAccount(id);
    }

    // ! features for user

    @Post('user/change-password')
    @HttpCode(HttpStatus.OK)
    @UseGuards(UserGuard)
    @ApiBearerAuth()
    async changePassword(@Req() req: FastifyRequest['raw'], @Body() password: PasswordDto) {
        var decoded = await this.authService.decodeToken(req.headers.authorization?.split(' ')[1]);
        return await this.authService.changePassword(decoded.id, password);
    }

    @Post('user/update-phone')
    @HttpCode(HttpStatus.OK)
    @UseGuards(UserGuard)
    @ApiBearerAuth()
    async changePhoneNumber(@Req() req: FastifyRequest['raw'], @Body() phone: PhoneDto) {
        var decoded = await this.authService.decodeToken(req.headers.authorization?.split(' ')[1]);
        return await this.authService.changePhoneNumber(decoded.id, phone);
    }

    @Post('user/update-username')
    @HttpCode(HttpStatus.OK)
    @UseGuards(UserGuard)
    @ApiBearerAuth()
    async changeUsername(@Req() req: FastifyRequest['raw'], @Body() username: UsernameDto) {
        var decoded = await this.authService.decodeToken(req.headers.authorization?.split(' ')[1]);
        return await this.authService.changeUsername(decoded.id, username);
    }

}