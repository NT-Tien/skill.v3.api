import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsArray, IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTicketVoucherDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    voucherCode: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    description: string

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    discount: number

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    quantity: number

    @ApiProperty()
    @IsDate()
    @Transform(({ value }) => new Date(value))
    @Type(() => Date)
    @IsNotEmpty()
    startDate: Date

    @ApiProperty()
    @IsDate()
    @Transform(({ value }) => new Date(value))
    @Type(() => Date)
    @IsNotEmpty()
    endDate: Date

    @ApiProperty()
    @IsArray()
    applyTicketId: string[]

    @ApiProperty()
    note: string

}