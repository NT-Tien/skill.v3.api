import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class CreateWaiterDto {

    @IsString()
    @IsNotEmpty()
    orderId: string;

    @IsString()
    @IsNotEmpty()
    paymentId: string;


}   