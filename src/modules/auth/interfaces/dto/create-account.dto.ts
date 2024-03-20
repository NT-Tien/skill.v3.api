import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";
import { BaseDTO } from "src/common/base/dto.base";
import { Role } from "src/entities/account.entity";


export class CreateAccountDto extends BaseDTO {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Expose()
    username: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @Expose()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsPhoneNumber()
    @Expose()
    phone: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Expose()
    password: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Expose()
    role: Role;

}