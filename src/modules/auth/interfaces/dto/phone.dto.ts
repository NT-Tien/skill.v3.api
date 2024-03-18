import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class PhoneDto {
    @ApiProperty()
    @IsPhoneNumber()
    @IsString()
    @IsNotEmpty()
    value: string;
}