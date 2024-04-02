import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export class GetCheckinRecordsDto {
    @ApiProperty()
    @IsUUID()
    @IsNotEmpty()
    idOrder: string;
}