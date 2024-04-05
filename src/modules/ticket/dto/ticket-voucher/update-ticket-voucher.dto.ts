import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsDate, IsNumber, IsString, ValidateIf } from "class-validator";
import { BaseDTO } from "src/common/base/dto.base";

export class UpdateTicketVoucherDto extends BaseDTO {

    @ApiProperty()
    @IsString()
    @ValidateIf((object, value) => value !== undefined)
    voucherCode: string

    @ApiProperty()
    @IsNumber()
    @ValidateIf((object, value) => value !== undefined)
    discount: number;

    @ApiProperty()
    @IsNumber()
    @ValidateIf((object, value) => value !== undefined)
    quantity: number

    @ApiProperty()
    @IsDate()
    @Transform(({ value }) => value ? new Date(value) : value)
    @Type(() => Date)
    @ValidateIf((object, value) => value !== undefined)
    startDate: Date

    @ApiProperty()
    @IsDate()
    @Transform(({ value }) => value ? new Date(value) : value)
    @ValidateIf((object, value) => value !== undefined)
    endDate: Date

    @ApiProperty()
    @IsString()
    @ValidateIf((object, value) => value !== undefined)
    note: string

    @ApiProperty()
    @IsString()
    @ValidateIf((object, value) => value !== undefined)
    project: string

    updatedAt?: Date
}