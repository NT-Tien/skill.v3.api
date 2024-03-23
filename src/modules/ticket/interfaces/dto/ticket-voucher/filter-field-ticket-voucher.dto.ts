import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform, Type } from "class-transformer";
import { IsArray, IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { BaseDTO } from "src/common/base/dto.base";

export class FilterFieldTicketVoucherDto extends BaseDTO {

    @Expose()
    id: string

    @Expose()
    voucherCode: string

    @Expose()
    discount: number

    @Expose()
    quantity: number

}