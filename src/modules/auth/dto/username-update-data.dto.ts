import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UsernameDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    value: string;
}