import { HttpException, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { TicketOrderServiceInterface } from "../interfaces/ticket-order.interface";
import { TicketOrderEntity } from "../entities/ticket-order.entity";
import { CreateTicketOrderDto } from "../interfaces/dto/ticket-order/create-ticket-order.dto";
import { PayOSService } from "./payment/payos.service";
import { TicketOrderItemEntity } from "../entities/ticket-order-item.entity";

@Injectable()
export class TicketOrderService implements TicketOrderServiceInterface {
    constructor(
        @InjectRepository(TicketOrderEntity) private ticketOrderRepository: Repository<TicketOrderEntity>,
        @Inject('PAYOS_SERVICE_TIENNT') private payOSService: PayOSService,
        private dataSource: DataSource // for transaction
    ) { }
    getAvailableOrders(): Promise<any> {
        return this.ticketOrderRepository.createQueryBuilder("TICKET_ORDER")
            .leftJoinAndSelect("TICKET_ORDER.items", "TICKET_ORDER_ITEM")
            .getMany();
    }
    async createTicketOrder(data: CreateTicketOrderDto): Promise<any> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction("SERIALIZABLE");
        try {
            // check order is available or not

            // -------------------------------
            var order = await queryRunner.manager.save(TicketOrderEntity, data);
            for (const item of data.items) {
                queryRunner.manager.save(TicketOrderItemEntity, {
                    ticketOrder: order.id,
                    ticket: item.ticketId,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                });
            }
            // create link to payment
            var payload = {
                orderCode: Date.now(),
                amount: order.total,
                description: order.phone,
                buyerName: "NGUYEN TRONG TIEN",
                buyerEmail: "test.dev@gmail.com",
                buyerPhone: "0123456789",
                items: order.items
            }
            var result = await this.payOSService.createLinkPayment(payload);
            console.log(result);
            await queryRunner.commitTransaction();
            return result;
        } catch (e) {
            await queryRunner.rollbackTransaction();
            throw new HttpException(e, 500);
        } finally {
            await queryRunner.release();
        }
    }
    softDeleteTicketOrder(id: string): Promise<any> {
        return this.ticketOrderRepository.update(id, { deletedAt: new Date() });
    }
    unDeleteTicketOrder(id: string): Promise<any> {
        return this.ticketOrderRepository.update(id, { deletedAt: null });
    }
    getTicketOrderById(id: string): Promise<any> {
        return this.ticketOrderRepository.find({ where: { id } });
    }
    getTicketOrders(): Promise<any> {
        return this.ticketOrderRepository.createQueryBuilder("TICKET_ORDER")
            .leftJoinAndSelect("TICKET_ORDER.items", "TICKET_ORDER_ITEM")
            .leftJoin("TICKET_ORDER_ITEM.ticket", "TICKET")
            .addSelect(["TICKET.id"])
            .getMany();
    }
}