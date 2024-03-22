import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { TicketEntity } from "./entities/ticket.entity";
import { TicketServiceInterface } from "./interfaces/ticket.interface";
import { CreateTicketDto } from "./interfaces/dto/ticket/create-ticket.dto";
import { UpdateTicketDto } from "./interfaces/dto/ticket/update-ticket.dto";

@Injectable()
export class TicketService implements TicketServiceInterface {
    constructor(
        @InjectRepository(TicketEntity) private ticketRepository: Repository<TicketEntity>,
        private dataSource: DataSource // for transaction
    ) { }
    createTicket(data: CreateTicketDto): Promise<any> {
        return this.ticketRepository.save(data);
    }
    async updateTicket(id: string, data: UpdateTicketDto): Promise<any> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction("SERIALIZABLE");
        try {
            var validData = UpdateTicketDto.plainToClass(data);
            validData.updatedAt = new Date();
            var result = await queryRunner.manager.update(TicketEntity, id, validData);
            await queryRunner.commitTransaction();
            return result;
        } catch (e) {
            await queryRunner.rollbackTransaction();
            throw new HttpException(e, 500);
        } finally {
            await queryRunner.release();
        }
    }
    async increaseTicketQuantity(id: string, quantity: number): Promise<any> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction("SERIALIZABLE");
        try {
            var result = await queryRunner.manager.increment(TicketEntity, { id }, 'quantity', quantity);
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
            var result = await queryRunner.manager.decrement(TicketEntity, { id }, 'quantity', quantity);
            await queryRunner.commitTransaction();
            return result;
        } catch (e) {
            await queryRunner.rollbackTransaction();
            throw new HttpException(e, 500);
        } finally {
            await queryRunner.release();
        }
    }
    deleteTicket(id: string): Promise<any> {
        return this.ticketRepository.delete(id);
    }
    softDeleteTicket(id: string): Promise<any> {
        return this.ticketRepository.update(id, { deletedAt: new Date() });
    }
    unDeleteTicket(id: string): Promise<any> {
        return this.ticketRepository.update(id, { deletedAt: null });
    }
    getTicketById(id: string): Promise<any> {
        return this.ticketRepository.find({ where: { id } });
    }
    getTickets(): Promise<any> {
        return this.ticketRepository.find();
    }
}