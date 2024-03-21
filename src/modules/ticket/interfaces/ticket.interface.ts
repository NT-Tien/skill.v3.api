import { CreateTicketDto } from "./dto/ticket/create-ticket.dto";
import { UpdateTicketDto } from "./dto/ticket/update-ticket.dto";

export interface TicketServiceInterface {
    // CRUD only for admin account
    createTicket(data: CreateTicketDto): Promise<any>;
    updateTicket(id: string, data: UpdateTicketDto): Promise<any>;
    deleteTicket(id: string): Promise<any>;
    softDeleteTicket(id: string): Promise<any>;
    unDeleteTicket(id: string): Promise<any>;
    getTicketById(id: string): Promise<any>;
    getTickets(): Promise<any>;
}