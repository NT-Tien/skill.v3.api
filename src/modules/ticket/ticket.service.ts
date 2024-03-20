import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TicketEntity } from "./entities/ticket.entity";
import { TicketServiceInterface } from "./interfaces/ticket.interface";
import { CreateTicketDto } from "./interfaces/dto/create-ticket.dto";
import { UpdateTicketDto } from "./interfaces/dto/update-ticket.dto";

@Injectable()
export class TicketService implements TicketServiceInterface {
    constructor(
        @InjectRepository(TicketEntity) private ticketRepository: Repository<TicketEntity>
    ) { }
    createTicket(data: CreateTicketDto): Promise<any> {
        throw new Error("Method not implemented.");
    }
    updateTicket(id: string, data: UpdateTicketDto): Promise<any> {
        throw new Error("Method not implemented.");
    }
    deleteTicket(id: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    softDeleteTicket(id: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    unDeleteTicket(id: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    getTicketById(id: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    getTickets(): Promise<any> {
        throw new Error("Method not implemented.");
    }
    
}