import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";
import { TicketOrderStatus } from "src/modules/ticket/entities/ticket-order.entity";

export class UpdateTicketOrderDto {
    payment: any;
    status: TicketOrderStatus;
}