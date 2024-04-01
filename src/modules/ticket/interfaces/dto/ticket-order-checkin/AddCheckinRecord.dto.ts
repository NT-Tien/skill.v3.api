import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export class AddCheckinRecordDto {
    @ApiProperty()
    @IsUUID()
    @IsNotEmpty()
    idOrder: string;

    @ApiProperty()
    @IsUUID()
    @IsNotEmpty()
    idItem: string;
}