import { CreateTicketOrderDto } from "../dto/ticket-order/create-ticket-order.dto";
import { UpdateTicketOrderDto } from "../dto/ticket-order/update-ticket-order.dto";

export interface TicketOrderServiceInterface {
    // CRUD only for admin account
    createTicketOrder(data: CreateTicketOrderDto): Promise<any>;
    updateTicketOrder(id: string, data: UpdateTicketOrderDto): Promise<any>;
    softDeleteTicketOrder(id: string): Promise<any>;
    unDeleteTicketOrder(id: string): Promise<any>;
    getTicketOrderById(id: string): Promise<any>;
    getTicketOrders(): Promise<any>;
    // ! handle ticket Order with ticket

    getOrdersByUser(): Promise<any>;

}