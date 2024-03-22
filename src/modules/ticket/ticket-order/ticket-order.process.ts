// item.processor.ts
import { Process, Processor } from '@nestjs/bull';
import { Inject } from '@nestjs/common';
import { Job } from 'bull';
import { TicketOrderService } from './ticket-order.service';

@Processor('ticket-order-queue')
export class TicketOrderProcessor {
    constructor(
        @Inject('TICKET_ORDER_SERVICE_TIENNT') private ticketOrderService: TicketOrderService,
    ) { }

    @Process()
    async processJob(job: Job<any>) {
        const { data } = job;
        return await this.ticketOrderService.createTicketOrder(data.data);

    }
}
