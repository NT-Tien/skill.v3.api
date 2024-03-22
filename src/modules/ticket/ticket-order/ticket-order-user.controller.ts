import { Body, Controller, Get, HttpException, Inject, Param, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { InjectQueue } from "@nestjs/bull";
import { Job, Queue } from 'bull';
import { CreateTicketOrderDto } from "../interfaces/dto/ticket-order/create-ticket-order.dto";
import { TicketOrderService } from "./ticket-order.service";


@ApiTags('ticket-order-user')
@Controller('ticket-order-user')
export class TicketOrderUserController {
    constructor(
        @InjectQueue('ticket-order-queue') private readonly orderQueue: Queue,
        @Inject('TICKET_ORDER_SERVICE_TIENNT') private ticketOrderService: TicketOrderService,
    ) { }

    @Post('create-link')
    async createLinkPayment(@Body() order: CreateTicketOrderDto) {
        // return await this.orderQueue.add({ data: order } as Job<any>, { delay: 3000 });
        return await this.ticketOrderService.createTicketOrder(order);
    }

    @Get('get-result/:orderId')
    async getResult(@Param('orderId') orderId: string) {
        const job = await this.orderQueue.getJob(orderId);
        if (!job) {
            throw new HttpException('Job not found', 404);
        }
        return job;
    }


}