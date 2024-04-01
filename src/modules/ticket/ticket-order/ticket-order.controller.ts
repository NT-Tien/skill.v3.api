import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AdminGuard } from "src/modules/auth/guards/admin.guard";
import { CreateTicketOrderDto } from "../interfaces/dto/ticket-order/create-ticket-order.dto";
import { TicketOrderServiceInterface } from "../interfaces/ticket-order.interface";

@ApiTags('ticket-order')
@UseGuards(AdminGuard)
@Controller('ticket-order')
export class TicketOrderController {
    constructor(
        @Inject('TICKET_ORDER_SERVICE_TIENNT') private ticketOrderService: TicketOrderServiceInterface
    ) { }

    @Get()
    @ApiBearerAuth()
    async getAll() {
        return await this.ticketOrderService.getTicketOrders();
    }

    @Get('/:id')
    @ApiBearerAuth()
    async getOne(@Param('id') id: string) {
        return await this.ticketOrderService.getTicketOrderById(id);
    }

    @Post()
    @ApiBearerAuth()
    async create(@Body() data: CreateTicketOrderDto) {
        return await this.ticketOrderService.createTicketOrder(data);
    }

    @Delete('/:id')
    @ApiBearerAuth()
    async delete(@Param('id') id: string) {
        return await this.ticketOrderService.softDeleteTicketOrder(id);
    }

    @Put('/undelete/:id')
    @ApiBearerAuth()
    async unDelete(@Param('id') id: string) {
        return await this.ticketOrderService.unDeleteTicketOrder(id);
    }
    
}