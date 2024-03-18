import { Body, Controller, Delete, Headers, HttpCode, HttpException, HttpStatus, Inject, Param, Post, Put, Res, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { UserGuard } from "./guards/user.guard";
import { RegisterDataDto } from "./interfaces/dto/register-data.dto";
import { LoginLocalDataDto } from "./interfaces/dto/login-data";
import { AdminGuard } from "./guards/admin.guard";
import { AdminUpdateAccountDataDto } from "./interfaces/dto/admin-update-data.dto";
import { PhoneDto } from "./interfaces/dto/phone.dto";

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(
        @Inject('AUTH_SERVICE_TIENNT') private readonly authService: AuthService,
    ) { }

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() data: RegisterDataDto) {
        return await this.authService.register(data);
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

    @Post('verify-token')
    @HttpCode(HttpStatus.OK)
    async verifyToken(@Headers('authorization') token: string) {
        return await this.authService.verifyToken(token);
    }

    @Post('verify-admin-token')
    @HttpCode(HttpStatus.OK)
    async verifyAdminToken(@Headers('authorization') token: string) {
        return await this.authService.verifyAdminToken(token);
    }

    // ! apis for admin

    @Post('admin/create-account')
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(AdminGuard)
    @ApiBearerAuth()
    async createAccount(@Body() data: RegisterDataDto) {
        return await this.authService.createAccount(data);
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
    async changePassword(@Headers('authorization') token: string, @Body() data: { newPassword: string }) {
        var decoded = await this.authService.decodeToken(token);
        return await this.authService.changePassword(decoded.id, data.newPassword);
    }

    @Post('user/update-phone')
    @HttpCode(HttpStatus.OK)
    @UseGuards(UserGuard)
    @ApiBearerAuth()
    async changePhoneNumber(@Headers('authorization') token: string, @Body() data: { phone: PhoneDto }) {
        var decoded = await this.authService.decodeToken(token);
        return await this.authService.changePhoneNumber(decoded.id, data.phone);
    }

}