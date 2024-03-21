import { Body, Controller, Get, HttpException, Inject, Param, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { InjectQueue } from "@nestjs/bull";
import { Job, Queue } from 'bull';
import { CreateTicketOrderDto } from "../interfaces/dto/ticket-order/create-ticket-order.dto";


@ApiTags('ticket-order-user')
@Controller('ticket-order-user')
export class TicketOrderUserController {
    constructor(
        @InjectQueue('ticket-order-queue') private readonly orderQueue: Queue,
    ) { }

    @Post('create-link')
    async createLinkPayment(@Body() order: CreateTicketOrderDto) {
        return await this.orderQueue.add({ data: order } as Job<any>, { delay: 3000 });
    }

}