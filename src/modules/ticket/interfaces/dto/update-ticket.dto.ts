import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { BaseDTO } from "src/common/base/dto.base";

export class UpdateTicketDto extends BaseDTO {

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