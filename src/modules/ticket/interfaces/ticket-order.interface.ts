import { CreateTicketOrderDto } from "./dto/ticket-order/create-ticket-order.dto";

export interface TicketOrderServiceInterface {
    // CRUD only for admin account
    createTicketOrder(data: CreateTicketOrderDto): Promise<any>;
    softDeleteTicketOrder(id: string): Promise<any>;
    unDeleteTicketOrder(id: string): Promise<any>;
    getTicketOrderById(id: string): Promise<any>;
    getTicketOrders(): Promise<any>;
    // ! handle ticket Order with ticket

    getOrdersByUser(): Promise<any>;

}