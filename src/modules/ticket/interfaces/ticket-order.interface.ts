import { CreateTicketOrderDto } from "./dto/ticket-order/create-ticket-order.dto";

export interface TicketOrderServiceInterface {
    // CRUD only for admin account
    createTicketOrder(data: CreateTicketOrderDto): Promise<any>;
    softDeleteTicketOrder(id: string): Promise<any>;
    unDeleteTicketOrder(id: string): Promise<any>;
    getTicketOrderById(id: string): Promise<any>;
    getTicketOrders(): Promise<any>;
    // ! handle ticket Order with ticket
    /** 
     * @description Check available orders for payment, if the ticket is not available, it will return an error
     * @description First step: check the ticket is available or not
     * @description Second step: check the ticket voucher is available for the user or not (if apply voucher code)
     * @description Third step: check the ticket is available for the user or not
     */
    getAvailableOrders(order: CreateTicketOrderDto): Promise<any>;

}