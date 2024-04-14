import { Body, Controller, Get, HttpException, Inject, Param, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";
import { InjectQueue } from "@nestjs/bull";
import { Job, Queue } from 'bull';
import { CreateTicketOrderDto } from "../dto/ticket-order/create-ticket-order.dto";
import { TicketOrderService } from "./ticket-order.service";
import { FastifyRequest } from "fastify";
import { UserGuard } from "src/modules/auth/guards/user.guard";
import { AuthService } from "src/modules/auth/auth.service";

@ApiTags('ticket-order-user')
@Controller('ticket-order-user')
export class TicketOrderUserController {
    constructor(
        @InjectQueue('ticket-order-queue') private readonly orderQueue: Queue,
        @Inject('TICKET_ORDER_SERVICE_TIENNT') private ticketOrderService: TicketOrderService,
        @Inject('AUTH_SERVICE_TIENNT') private authService: AuthService,
    ) { }

    @Post('create-link')
    async createLinkPayment(@Req() req: FastifyRequest['raw'], @Body() order: CreateTicketOrderDto) {
        // check user have any pending order
        var token = req.headers.authorization?.split(' ')[1];
        var payload = await this.authService.decodeToken(token);
        var orders = await this.ticketOrderService.getTicketOrderByEmail(payload.email);
        if (orders.some(item => item.status == 'PENDING')) throw new HttpException('User have pending order', 400);
        // check order have ticket or not
        if (order.items.length == 0) throw new HttpException('Order have no ticket', 400);
        return await this.orderQueue.add({ data: order } as Job<any>, { delay: 3000 });
        // return await this.ticketOrderService.createTicketOrder(order);
    }

    @Get('get-result/:orderId')
    async getResult(@Param('orderId') orderId: string) {
        const job = await this.orderQueue.getJob(orderId);
        if (!job) {
            throw new HttpException('Job not found', 404);
        }
        return job;
    }

    @ApiBearerAuth()
    @UseGuards(UserGuard)
    @Get('get-orders')
    async getResultByEmail(@Req() req: FastifyRequest['raw']) {
        var token = req.headers.authorization?.split(' ')[1];
        var payload = await this.authService.decodeToken(token);
        return await this.ticketOrderService.getTicketOrderByEmail(payload.email);
    }

    // @Post('send-mail')  
    // @ApiBody({ type: Object })
    // async sendMail(@Body() payload: any) {
    //     return await sendMailForUserPaid(payload);
    // }


}