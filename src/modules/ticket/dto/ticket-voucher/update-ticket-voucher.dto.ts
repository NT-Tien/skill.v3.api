import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsDate, IsNumber, IsString } from "class-validator";
import { BaseDTO } from "src/common/base/dto.base";

export class UpdateTicketVoucherDto extends BaseDTO {

    @ApiProperty()
    @IsString()
    ticketName: string

    @ApiProperty()
    @IsNumber()
    price: number

    @ApiProperty()
    @IsNumber()
    quantity: number

    @ApiProperty()
    @IsDate()
    @Transform(({ value }) => new Date(value))
    @Type(() => Date)
    startDate: Date

    @ApiProperty()
    @IsDate()
    @Transform(({ value }) => new Date(value))
    endDate: Date

    @ApiProperty()
    note: string

    @ApiProperty()
    project: string

}