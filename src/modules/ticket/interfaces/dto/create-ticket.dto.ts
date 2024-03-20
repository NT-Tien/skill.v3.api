import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTicketDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    ticketName: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    description: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    startDate: Date

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    endDate: Date

}