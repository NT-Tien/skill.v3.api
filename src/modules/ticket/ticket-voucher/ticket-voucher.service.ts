import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { TicketVoucherEntity } from "../entities/ticket-voucher.entity";
import { TicketVoucherServiceInterface } from "../interfaces/ticket-voucher.interface";
import { CreateTicketVoucherDto } from "../dto/ticket-voucher/create-ticket-voucher.dto";
import { UpdateTicketVoucherDto } from "../dto/ticket-voucher/update-ticket-voucher.dto";

@Injectable()
export class TicketVoucherService implements TicketVoucherServiceInterface {
    constructor(
        @InjectRepository(TicketVoucherEntity) private ticketVoucherRepository: Repository<TicketVoucherEntity>,
        private dataSource: DataSource // for transaction

    ) { }
    async increaseTicketQuantity(id: string, quantity: number): Promise<any> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction("SERIALIZABLE");
        try {
            var result = await queryRunner.manager.increment(TicketVoucherEntity, { id }, 'quantity', quantity);
            await queryRunner.commitTransaction();
            return result;
        } catch (e) {
            await queryRunner.rollbackTransaction();
            throw new HttpException(e, 500);
        } finally {
            await queryRunner.release();
        }
    }
    async decreaseTicketQuantity(id: string, quantity: number): Promise<any> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction("SERIALIZABLE");
        try {
            var result = await queryRunner.manager.increment(TicketVoucherEntity, { id }, 'quantity', quantity);
            await queryRunner.commitTransaction();
            return result;
        } catch (e) {
            await queryRunner.rollbackTransaction();
            throw new HttpException(e, 500);
        } finally {
            await queryRunner.release();
        }
    }
    async getAvailableVouchers(ticketIds: string[], email: string): Promise<any> {
        var vouchers = await this.ticketVoucherRepository.find();
        var now = new Date();
        // get vouchers that are available for user email
        return vouchers.filter(voucher => {
            if (now > voucher.startDate && now < voucher.endDate
                && voucher.quantity > 0
                && (voucher.applyTicketId?.length == 0 || voucher.applyTicketId.some(id => ticketIds.includes(id)))
            ) return voucher;
        });
    }
    createTicketVoucher(data: CreateTicketVoucherDto): Promise<any> {
        return this.ticketVoucherRepository.save(data);
    }
    async updateTicketVoucher(id: string, data: UpdateTicketVoucherDto): Promise<any> {
        // return this.ticketVoucherRepository.update(id, data);
        // use transactin
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction("SERIALIZABLE");
        try {
            var validData = UpdateTicketVoucherDto.plainToClass(data);
            validData.updatedAt = new Date();
            var result = await queryRunner.manager.update(TicketVoucherEntity, id, validData);
            await queryRunner.commitTransaction();
            return result;
        } catch (e) {
            await queryRunner.rollbackTransaction();
            throw new HttpException(e, 500);
        } finally {
            await queryRunner.release();
        }
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