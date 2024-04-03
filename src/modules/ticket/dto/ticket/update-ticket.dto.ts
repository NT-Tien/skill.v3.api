import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform, Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsString, ValidateIf } from "class-validator";
import { BaseDTO } from "src/common/base/dto.base";

export class UpdateTicketDto extends BaseDTO {

    @ValidateIf((object, value) => value !== undefined)
    @ApiProperty()
    @IsString()
    @Expose()
    ticketName: string

    @ValidateIf((object, value) => value !== undefined)
    @ApiProperty()
    @IsString()
    @Expose()
    description: string

    @ApiProperty()
    @IsNumber()
    @ValidateIf((object, value) => value !== undefined)
    @Expose()
    price!: number | null;

    @ApiProperty()
    @IsDate()
    @Transform(({ value }) => value ? new Date(value) : value)
    @Type(() => Date)
    @ValidateIf((object, value) => value !== undefined)
    @Expose()
    startDate: Date

    @ApiProperty()
    @IsDate()
    @Transform(({ value }) => value ? new Date(value) : value)
    @Type(() => Date)
    @ValidateIf((object, value) => value !== undefined)
    @Expose()
    endDate: Date

    @ApiProperty()
    @IsString()
    @ValidateIf((object, value) => value !== undefined)
    @Expose()
    image: string

    updatedAt: Date

}