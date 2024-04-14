import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform, Type } from "class-transformer";
import { IsDate, IsNumber, IsString, ValidateIf } from "class-validator";
import { BaseDTO } from "src/common/base/dto.base";

export class UpdateTicketVoucherDto extends BaseDTO {

    @ApiProperty()
    @IsString()
    @ValidateIf((object, value) => value !== undefined)
    @Expose()
    voucherCode: string

    @ApiProperty()
    @IsNumber()
    @ValidateIf((object, value) => value !== undefined)
    @Expose()
    discount: number;

    @ApiProperty()
    @IsNumber()
    @ValidateIf((object, value) => value !== undefined)
    @Expose()
    quantity: number

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
    @ValidateIf((object, value) => value !== undefined)
    @Expose()
    endDate: Date

    @ApiProperty()
    @IsString()
    @ValidateIf((object, value) => value !== undefined)
    @Expose()
    note: string

    @ApiProperty()
    @IsString()
    @ValidateIf((object, value) => value !== undefined)
    project: string

    updatedAt?: Date
}