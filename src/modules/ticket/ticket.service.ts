import { Injectable } from "@nestjs/common";
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
    updateTicket(id: string, data: UpdateTicketDto): Promise<any> {
        var validData = UpdateTicketDto.plainToClass(data);
        console.log(validData);
        
        return this.ticketRepository.update(id, validData);
    }
    deleteTicket(id: string): Promise<any> {
        return this.ticketRepository.delete(id);
    }
    softDeleteTicket(id: string): Promise<any> {
        return this.ticketRepository.update(id, { deletedAt: new Date()});
    }
    unDeleteTicket(id: string): Promise<any> {
        return this.ticketRepository.update(id, { deletedAt: null});
    }
    getTicketById(id: string): Promise<any> {
        return this.ticketRepository.find({ where: { id } });
    }
    getTickets(): Promise<any> {
        return this.ticketRepository.find();
    }
}