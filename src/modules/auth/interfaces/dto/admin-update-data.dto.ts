import { ApiProperty } from "@nestjs/swagger";
import { IsPhoneNumber, IsString } from "class-validator";
import { Role } from "../../entities/account.entity";


export class AdminUpdateAccountDataDto {

    @ApiProperty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsString()
    @IsPhoneNumber()
    phone: string;

    @ApiProperty()
    @IsString()
    role: Role;

    @ApiProperty()
    @IsString()
    password: string;

}