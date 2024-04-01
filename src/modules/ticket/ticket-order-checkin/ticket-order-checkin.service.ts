import { Injectable } from "@nestjs/common";
import { TicketOrderCheckinServiceInterface } from "../interfaces/ticket-order-checkin.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { TicketOrderCheckinEntity } from "../entities/ticket-order-checkin.entity";
import { Repository } from "typeorm";

@Injectable()
export class TicketOrderCheckinService implements TicketOrderCheckinServiceInterface{
    constructor(
        @InjectRepository(TicketOrderCheckinEntity) private ticketOrderCheckinRepository: Repository<TicketOrderCheckinEntity>
    ) { }
    addCheckinRecord(idOrder: string, idItem: string): Promise<any> {
        return this.ticketOrderCheckinRepository.save({idOrder, idItem});
    }
    getCheckinRecords(idOrder: string): Promise<any> {
        return this.ticketOrderCheckinRepository.find({where: {idOrder}});
    }
    getCheckinRecordById(id: string): Promise<any> {
        return this.ticketOrderCheckinRepository.find({where: {id}});
    }
}