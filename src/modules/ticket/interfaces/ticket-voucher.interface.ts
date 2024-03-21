import { CreateTicketVoucherDto } from "./dto/ticket-voucher/create-ticket-voucher.dto";
import { UpdateTicketVoucherDto } from "./dto/ticket-voucher/update-ticket-voucher.dto";

export interface TicketVoucherServiceInterface {
    // CRUD only for admin account
    createTicketVoucher(data: CreateTicketVoucherDto): Promise<any>;
    updateTicketVoucher(id: string, data: UpdateTicketVoucherDto): Promise<any>;
    deleteTicketVoucher(id: string): Promise<any>;
    softDeleteTicketVoucher(id: string): Promise<any>;
    unDeleteTicketVoucher(id: string): Promise<any>;
    getTicketVoucherById(id: string): Promise<any>;
    getTicketVouchers(): Promise<any>;
    // ! handle ticket voucher with ticket
    /** 
     * @description get available vouchers for ticket by ticketId and email - with ticketId stay in applyTicketId and email stay in applyEmail of voucher or length of applyTicketId and applyEmail is 0
     * @param ticketId
     * @param email
     * @returns array of vouchers
    */
    getAvailableVouchers(ticketId: string, email: string): Promise<any>;
}