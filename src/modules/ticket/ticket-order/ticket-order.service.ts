import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { TicketOrderServiceInterface } from "../interfaces/ticket-order.interface";
import { TicketOrderEntity } from "../entities/ticket-order.entity";
import { CreateTicketOrderDto } from "../interfaces/dto/ticket-order/create-ticket-order.dto";

@Injectable()
export class TicketOrderService implements TicketOrderServiceInterface {
    constructor(
        @InjectRepository(TicketOrderEntity) private ticketOrderRepository: Repository<TicketOrderEntity>,
        private dataSource: DataSource // for transaction
    ) { }
    getAvailableOrders(order: CreateTicketOrderDto): Promise<any> {
        throw new Error("Method not implemented.");
    }
    createTicketOrder(data: CreateTicketOrderDto): Promise<any> {
        // add new order by admin
        return this.ticketOrderRepository.save(data);
    }
    deleteTicketOrder(id: string): Promise<any> {
        return this.ticketOrderRepository.delete(id);
    }
    softDeleteTicketOrder(id: string): Promise<any> {
        return this.ticketOrderRepository.update(id, { deletedAt: new Date()});
    }
    unDeleteTicketOrder(id: string): Promise<any> {
        return this.ticketOrderRepository.update(id, { deletedAt: null});
    }
    getTicketOrderById(id: string): Promise<any> {
        return this.ticketOrderRepository.find({ where: { id } });
    }
    getTicketOrders(): Promise<any> {
        return this.ticketOrderRepository.find();
    }
}