import { HttpException, Injectable } from "@nestjs/common";
import { TicketOrderCheckinServiceInterface } from "../interfaces/ticket-order-checkin.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { TicketOrderCheckinEntity } from "../entities/ticket-order-checkin.entity";
import { Repository } from "typeorm";
import { TicketOrderEntity } from "../entities/ticket-order.entity";

@Injectable()
export class TicketOrderCheckinService implements TicketOrderCheckinServiceInterface{
    constructor(
        @InjectRepository(TicketOrderCheckinEntity) private ticketOrderCheckinRepository: Repository<TicketOrderCheckinEntity>,
        @InjectRepository(TicketOrderEntity) private ticketOrderRepository: Repository<TicketOrderEntity>
    ) { }
    async addCheckinRecord(idOrder: string, idItem: string): Promise<any> {
        // check order is deleted
        var order = await this.ticketOrderRepository.findOne({where: {id: idOrder}});
        console.log(order);
        
        if (order?.deletedAt !== null) {
            throw new HttpException("Order info not valid", 400);
        }
        return this.ticketOrderCheckinRepository.save({idOrder, idItem});
    }
    getCheckinRecords(idOrder: string): Promise<any> {
        return this.ticketOrderCheckinRepository.find({where: {idOrder}});
    }
}