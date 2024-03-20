import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";
import { Role } from "src/entities/account.entity";


export class CreateProjectDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    username: string;

}