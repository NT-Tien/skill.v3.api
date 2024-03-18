import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class PasswordDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    value: string;
}