import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { TicketVoucherService } from "./ticket-voucher.service";
import { FastifyRequest } from "fastify";
import { Controller, Inject, Post, Req, Body, UseGuards } from "@nestjs/common";
import { UserGuard } from "src/modules/auth/guards/user.guard";
import jwt from 'jsonwebtoken';

@ApiTags('ticket-voucher-user')
@UseGuards(UserGuard)
@Controller('ticket-voucher-user')
export class TicketVoucherUserController {
    constructor(
        @Inject('TICKET_VOUCHER_SERVICE_TIENNT') private ticketVoucherService: TicketVoucherService
    ) { }

    @Post('get-available-vouchers')
    @ApiBearerAuth()
    async getAvailableVouchers(@Req() req: FastifyRequest['raw'], @Body() data: { ticketId: string }) {
        var token = req.headers.authorization?.split(' ')[1];
        var decoded = jwt.decode(token) as any;
        if (!decoded.email) throw new Error('Email in token is not exits!');
        return await this.ticketVoucherService.getAvailableVouchers(data.ticketId, decoded.email);
    }
    
}