import { TicketOrderStatus } from "src/modules/ticket/entities/ticket-order.entity";

export class UpdateTicketOrderDto {
    payment: any;
    status: TicketOrderStatus;
}