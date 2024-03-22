import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform, Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { BaseDTO } from "src/common/base/dto.base";

export class UpdateTicketDto extends BaseDTO {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Expose()
    ticketName: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    description: string

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    @Expose()
    price: number

    @ApiProperty()
    @IsDate()
    @Transform(({ value }) => new Date(value))
    @Type(() => Date)
    @IsNotEmpty()
    @Expose()
    startDate: Date

    @ApiProperty()
    @IsDate()
    @Transform(({ value }) => new Date(value))
    @Type(() => Date)
    @IsNotEmpty()
    @Expose()
    endDate: Date

    @Expose()
    updatedAt: Date

}