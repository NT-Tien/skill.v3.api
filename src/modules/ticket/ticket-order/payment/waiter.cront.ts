import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TicketOrderWaiterEntity } from '../../entities/ticket-order-waiter.entity';
import { Repository } from 'typeorm';
import { Interval } from '@nestjs/schedule';
import { TicketOrderService } from '../ticket-order.service';
import * as dotenv from 'dotenv';
import { TicketOrderEntity, TicketOrderStatus } from '../../entities/ticket-order.entity';
import { sendMailForUserPaid } from './email.service';
import { TicketVoucherService } from '../../ticket-voucher/ticket-voucher.service';
import { TicketService } from '../../ticket.service';
dotenv.config();

@Injectable()
export class WaiterService {
    constructor(
        @InjectRepository(TicketOrderWaiterEntity) private waiterRepository: Repository<TicketOrderWaiterEntity>,
        @Inject('TICKET_ORDER_SERVICE_TIENNT') private ticketOrderService: TicketOrderService,
        @Inject('TICKET_VOUCHER_SERVICE_TIENNT') private ticketVoucherService: TicketVoucherService,
        @Inject('TICKET_SERVICE_TIENNT') private ticketService: TicketService,
    ) { }

    async checkIdOrder(idOrder: string): Promise<any> {
        return fetch(`https://api-merchant.payos.vn/v2/payment-requests/${idOrder}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-client-id': process.env.PAYOS_CLIENT_ID,
                'x-api-key': process.env.PAYOS_API_KEY,
            },
        })
            .then(response => response.json())
            .then(data => {
                return data;
            })
            .catch((error) => {
                return JSON.stringify(error);
            });
    }

    @Interval(2 * 60 * 1000) // Every 60 seconds
    async checkPayment() {
        var waiters = await this.waiterRepository.find();
        console.log(`Checking payment ${Date.now()}`, waiters);
        for (let i = 0; i < waiters.length; i++) {
            setTimeout(async () => {
                console.log('Checking payment', waiters[i].id);
                var waiter = waiters[i];
                var result = await this.checkIdOrder(waiter.paymentId);
                try {
                    await this.handleWaiter(waiter, result);
                } catch (error) {
                    console.log(error);
                    console.log('Error handle water: ', waiter.id);
                }
            }, 2000 * i)
        }
    }

    private async handleWaiter(waiter: any, result: any) {
        var order = await this.ticketOrderService.getTicketOrderById(waiter.orderId) as TicketOrderEntity;
        if (result.data.status === 'PAID') {
            // update order status
            await this.ticketOrderService.updateTicketOrder(waiter.orderId, {
                payment: result.data,
                status: TicketOrderStatus.PAID
            });
            // delete waiter
            await this.waiterRepository.delete(waiter.id);
            console.log('Order paid', order);
            await sendMailForUserPaid({
                total: order.total,
                items: order.items,
                ussername: order.username,
                phone: order.phone,
                email: order.email,
                voucher: order.ticketVoucher,
            })
        } else if (result.data.status === 'EXPIRED') {
            // increase products quantity back to stock
            order.items.forEach(async item => {
                await this.ticketService.increaseTicketQuantity(item.ticket.id, item.quantity);
            });
            // recover voucher quantity if user used voucher
            if (order.ticketVoucher) {
                await this.ticketVoucherService.increaseTicketQuantity(order.ticketVoucher.id, 1);
            }
            // update order status
            await this.ticketOrderService.updateTicketOrder(waiter.orderId, {
                payment: null,
                status: TicketOrderStatus.EXPIRED
            });
            await this.waiterRepository.delete(waiter.id);
        } else if (result.data.status === 'CANCELED') {
            // increase products quantity back to stock
            order.items.forEach(async item => {
                await this.ticketService.increaseTicketQuantity(item.ticket.id, item.quantity);
            });
            // recover voucher quantity if user used voucher
            if (order.ticketVoucher) {
                await this.ticketVoucherService.increaseTicketQuantity(order.ticketVoucher.id, 1);
            }
            // delete waiter
            await this.waiterRepository.delete(waiter.id);
            await this.ticketOrderService.updateTicketOrder(waiter.orderId, {
                payment: null,
                status: TicketOrderStatus.CANCELED
            });
        }
    }

}