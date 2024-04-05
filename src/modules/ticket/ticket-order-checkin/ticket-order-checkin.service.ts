import { HttpException, Injectable } from "@nestjs/common";
import { TicketOrderCheckinServiceInterface } from "../interfaces/ticket-order-checkin.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { TicketOrderCheckinEntity } from "../entities/ticket-order-checkin.entity";
import { Repository } from "typeorm";
import { TicketOrderEntity } from "../entities/ticket-order.entity";
import { TicketOrderItemEntity } from "../entities/ticket-order-item.entity";

@Injectable()
export class TicketOrderCheckinService implements TicketOrderCheckinServiceInterface {
    constructor(
        @InjectRepository(TicketOrderCheckinEntity) private ticketOrderCheckinRepository: Repository<TicketOrderCheckinEntity>,
        @InjectRepository(TicketOrderEntity) private ticketOrderRepository: Repository<TicketOrderEntity>,
    ) { }
    getAllCheckinRecords(): Promise<any> {
        return this.ticketOrderCheckinRepository.find();
    }
    async addCheckinRecord(idOrder: string, idItem: string): Promise<any> {
        // check order is deleted
        var order = await this.ticketOrderRepository
            .createQueryBuilder("TICKET_ORDER")
            .leftJoinAndSelect("TICKET_ORDER.items", "TICKET_ORDER_ITEM")
            .where("TICKET_ORDER.id = :id", { id: idOrder })
            .leftJoin("TICKET_ORDER_ITEM.ticket", "TICKET")
            .addSelect(["TICKET.id"])
            .getOne();
        if (order?.deletedAt !== null) {
            throw new HttpException("Order info not valid", 400);
        }
        // get checkin record
        var record = await this.ticketOrderCheckinRepository.find({ where: { idOrder, idItem } });
        // find idItem in order
        var item = order.items.find(item => item.id === idItem);
        if (item === undefined) {
            throw new HttpException("Item not found", 400);
        }
        if (record.length >= item.quantity) {
            throw new HttpException("Record is existed", 400);
        }
        return this.ticketOrderCheckinRepository.save({ idOrder, idItem });
    }
    getCheckinRecords(idOrder: string): Promise<any> {
        return this.ticketOrderCheckinRepository.find({ where: { idOrder } });
    }
    
}