import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";
import { FastifyRequest } from "fastify";
import { Controller, Inject, Post, Req, Body, UseGuards } from "@nestjs/common";
import { UserGuard } from "src/modules/auth/guards/user.guard";
import * as jwt from 'jsonwebtoken';
import { TicketVoucherServiceInterface } from "../interfaces/ticket-voucher.interface";

@ApiTags('ticket-voucher-user')
@UseGuards(UserGuard)
@Controller('ticket-voucher-user')
export class TicketVoucherUserController {
    constructor(
        @Inject('TICKET_VOUCHER_SERVICE_TIENNT') private ticketVoucherService: TicketVoucherServiceInterface
    ) { }

    @Post('get-available-vouchers')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                ticketIds: {
                    type: 'array',
                    items: { type: 'string' },
                }
            }
        },
        required: false
    })
    @ApiBearerAuth()
    async getAvailableVouchers(@Req() req: FastifyRequest['raw'], @Body() data: { ticketIds: string[] }) {
        var token = req.headers.authorization?.split(' ')[1];
        var decoded = jwt.decode(token) as any;
        if (!decoded.email) throw new Error('Email in token is not exits!');
        return await this.ticketVoucherService.getAvailableVouchers(data?.ticketIds, decoded?.email);
    }

}