import { HttpException, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { TicketOrderServiceInterface } from "../interfaces/ticket-order.interface";
import { TicketOrderEntity } from "../entities/ticket-order.entity";
import { CreateTicketOrderDto } from "../dto/ticket-order/create-ticket-order.dto";
import { PayOSService } from "./payment/payos.service";
import { TicketOrderItemEntity } from "../entities/ticket-order-item.entity";
import { TicketEntity } from "../entities/ticket.entity";
import { TicketVoucherEntity } from "../entities/ticket-voucher.entity";
import { isUUID } from "class-validator";
import { UpdateTicketOrderDto } from "../dto/ticket-order/update-ticket-order.dto";
import { FilterFieldTicketVoucherDto } from "../dto/ticket-voucher/filter-field-ticket-voucher.dto";

@Injectable()
export class TicketOrderService implements TicketOrderServiceInterface {
    constructor(
        @InjectRepository(TicketOrderEntity) private ticketOrderRepository: Repository<TicketOrderEntity>,
        @Inject('PAYOS_SERVICE_TIENNT') private payOSService: PayOSService,
        private dataSource: DataSource // for transaction
    ) { }
    updateTicketOrder(id: string, data: UpdateTicketOrderDto): Promise<any> {
        return this.ticketOrderRepository.update(id, data);
    }
    getOrdersByUser(): Promise<any> {
        return this.ticketOrderRepository.createQueryBuilder("TICKET_ORDER")
            .leftJoinAndSelect("TICKET_ORDER.items", "TICKET_ORDER_ITEM")
            .getMany();
    }
    async createTicketOrder(data: CreateTicketOrderDto): Promise<any> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction("SERIALIZABLE");
        try {
            // order limit 5 tickets
            var totalQuantity = 0;
            for (const item of data.items) {
                totalQuantity += item.quantity;
            }
            if (totalQuantity > 5) throw new HttpException('Order limit 5 tickets', 400);
            // check order data is available or not before create
            // 1. check ticket voucher is available if user added voucher
            var ticketVoucher: TicketVoucherEntity;
            if (data.ticketVoucher) {
                if (!isUUID(data.ticketVoucher as any)) throw new HttpException('Ticket Voucher is not correct', 400)
                ticketVoucher = await queryRunner.manager.findOne(TicketVoucherEntity, { where: { id: data.ticketVoucher } });
                if (!ticketVoucher) throw new HttpException('Ticket Voucher not found', 404);
                if (ticketVoucher.deletedAt) throw new HttpException('Ticket Voucher is deleted', 400);
                if (ticketVoucher.startDate > new Date()) throw new HttpException('Ticket Voucher is not available', 400);
                if (ticketVoucher.endDate < new Date()) throw new HttpException('Ticket Voucher is expired', 400);
                // check ticket voucher is available for tickets or user
                if (ticketVoucher.applyTicketId?.length > 0) {
                    if (!data.items.some(item => ticketVoucher.applyTicketId.includes(item.ticketId)))
                        throw new HttpException('Ticket Voucher is not available for user or any tickets', 400);
                }
            }
            // 2. check total price is correct
            var total = 0;
            for (const ticket of data.items) {
                var ticketEntity = await queryRunner.manager.findOne(TicketEntity, { where: { id: ticket.ticketId } });
                total += ticket.quantity * ticketEntity.price;
                if (!ticketEntity) throw new HttpException('Ticket not found', 404);
                if (ticketEntity.quantity < ticket.quantity) throw new HttpException('Ticket is not enough', 400);
                if (ticketEntity.deletedAt) throw new HttpException('Ticket is deleted', 400);
                if (ticketEntity.price != ticket.price) throw new HttpException('Ticket price is not correct', 400);
                if (ticketEntity.startDate > new Date()) throw new HttpException('Ticket is not available', 400);
                if (ticketEntity.endDate < new Date()) throw new HttpException('Ticket is expired', 400);
                if (ticketEntity.ticketName != ticket.name) throw new HttpException('Ticket name is not correct', 400);
            }
            if (ticketVoucher) {
                total = total - ticketVoucher.discount;
                if (total < 2000) {
                    data.total = 2000;
                }
                if (total != data.total) {
                    throw new HttpException('Total price is not correct', 400);
                }
                data.ticketVoucher = FilterFieldTicketVoucherDto.plainToClass(ticketVoucher);
            } else if (total != data.total)
                throw new HttpException('Total price is not correct', 400);
            // add order items
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
            // decrease ticket quantity
            for (const item of data.items) {
                await queryRunner.manager.decrement(TicketEntity, { id: item.ticketId }, 'quantity', item.quantity);
            }
            // decrease ticket voucher quantity
            if (ticketVoucher) {
                await queryRunner.manager.decrement(TicketVoucherEntity, { id: ticketVoucher.id }, 'quantity', 1);
            }
            // -------------------------------

            // create link to payment
            var payload = {
                orderId: order.id,
                orderCode: Date.now(),
                amount: order.total,
                description: order.phone,
                buyerName: "NGUYEN TRONG TIEN",
                buyerEmail: "test.dev@gmail.com",
                buyerPhone: "0123456789",
                items: order.items
            }
            var result = await this.payOSService.createLinkPayment(payload);
            if (result.code !== '00') throw new HttpException(result, 500);
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
    async getTicketOrderById(id: string): Promise<any> {
        var order = await this.ticketOrderRepository
            .createQueryBuilder("TICKET_ORDER")
            .leftJoinAndSelect("TICKET_ORDER.items", "TICKET_ORDER_ITEM")
            .where("TICKET_ORDER.id = :id", { id })
            .leftJoin("TICKET_ORDER_ITEM.ticket", "TICKET")
            .addSelect(["TICKET.id"])
            .getOne();
        if (!order) throw new HttpException('Order not found', 404);
        return order;
    }
    getTicketOrders(): Promise<any> {
        return this.ticketOrderRepository.createQueryBuilder("TICKET_ORDER")
            .leftJoinAndSelect("TICKET_ORDER.items", "TICKET_ORDER_ITEM")
            .leftJoin("TICKET_ORDER_ITEM.ticket", "TICKET")
            .addSelect(["TICKET.id"])
            .getMany();
    }
    getTicketOrderByEmail(email: string): Promise<any> {
        return this.ticketOrderRepository.createQueryBuilder("TICKET_ORDER")
            .where("TICKET_ORDER.email = :email", { email })
            .leftJoinAndSelect("TICKET_ORDER.items", "TICKET_ORDER_ITEM")
            .getMany();
    }
}