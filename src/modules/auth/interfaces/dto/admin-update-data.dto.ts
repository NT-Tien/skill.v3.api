import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";
import { Role } from "src/entities/account.entity";


export class AdminUpdateAccountDataDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsPhoneNumber()
    phone: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    role: Role;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;

}