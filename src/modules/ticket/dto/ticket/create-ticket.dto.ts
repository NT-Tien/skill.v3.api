import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

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
    @IsNumber()
    @IsNotEmpty()
    price: number

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
    @IsNotEmpty()
    images: string[]

    @ApiProperty()
    @IsUUID()
    @IsNotEmpty()
    project: string;

}