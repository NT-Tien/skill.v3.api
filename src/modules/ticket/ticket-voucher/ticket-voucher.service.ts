import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TicketVoucherEntity } from "../entities/ticket-voucher.entity";
import { TicketVoucherServiceInterface } from "../interfaces/ticket-voucher.interface";
import { CreateTicketVoucherDto } from "../interfaces/dto/ticket-voucher/create-ticket-voucher.dto";
import { UpdateTicketVoucherDto } from "../interfaces/dto/ticket-voucher/update-ticket-voucher.dto";

@Injectable()
export class TicketVoucherService implements TicketVoucherServiceInterface {
    constructor(
        @InjectRepository(TicketVoucherEntity) private ticketVoucherRepository: Repository<TicketVoucherEntity>
    ) { }
    async getAvailableVouchers(ticketId: string, email: string): Promise<any> {
        var vouchers = await this.ticketVoucherRepository.find();
        var now = new Date();
        return vouchers.filter(voucher => {
            if (now > voucher.startDate && now < voucher.endDate
                && voucher.quantity > 0
                && (
                    (voucher.applyTicketId.length == 0 || voucher.applyTicketId.includes(ticketId))
                    || (voucher.applyEmail.length == 0 || voucher.applyEmail.includes(email))
                )
            ) return voucher;
        });
    }
    createTicketVoucher(data: CreateTicketVoucherDto): Promise<any> {
        return this.ticketVoucherRepository.save(data);
    }
    updateTicketVoucher(id: string, data: UpdateTicketVoucherDto): Promise<any> {
        return this.ticketVoucherRepository.update(id, data);
    }
    deleteTicketVoucher(id: string): Promise<any> {
        return this.ticketVoucherRepository.delete(id);
    }
    softDeleteTicketVoucher(id: string): Promise<any> {
        return this.ticketVoucherRepository.update(id, { deletedAt: new Date() });
    }
    unDeleteTicketVoucher(id: string): Promise<any> {
        return this.ticketVoucherRepository.update(id, { deletedAt: null });
    }
    getTicketVoucherById(id: string): Promise<any> {
        return this.ticketVoucherRepository.find({ where: { id } });
    }
    getTicketVouchers(): Promise<any> {
        return this.ticketVoucherRepository.find();
    }

}