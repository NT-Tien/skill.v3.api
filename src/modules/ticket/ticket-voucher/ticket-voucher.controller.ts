import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AdminGuard } from "src/modules/auth/guards/admin.guard";
import { TicketVoucherService } from "./ticket-voucher.service";
import { CreateTicketVoucherDto } from "../dto/ticket-voucher/create-ticket-voucher.dto";
import { UpdateTicketVoucherDto } from "../dto/ticket-voucher/update-ticket-voucher.dto";

@ApiTags('ticket-voucher')
@UseGuards(AdminGuard)
@Controller('ticket-voucher')
export class TicketVoucherController {
    constructor(
        @Inject('TICKET_VOUCHER_SERVICE_TIENNT') private ticketVoucherService: TicketVoucherService
    ) { }

    @Get()
    @ApiBearerAuth()
    async getAll() {
        return await this.ticketVoucherService.getTicketVouchers();
    }

    @Get('/:id')
    @ApiBearerAuth()
    async getOne(@Param('id') id: string) {
        return await this.ticketVoucherService.getTicketVoucherById(id);
    }

    @Post()
    @ApiBearerAuth()
    async create(@Body() data: CreateTicketVoucherDto) {
        return await this.ticketVoucherService.createTicketVoucher(data);
    }

    @Put('/:id')
    @ApiBearerAuth()
    async update(@Param('id') id: string, @Body() data: UpdateTicketVoucherDto) {
        return await this.ticketVoucherService.updateTicketVoucher(id, data);
    }

    @Delete('/:id')
    @ApiBearerAuth()
    async delete(@Param('id') id: string) {
        return await this.ticketVoucherService.softDeleteTicketVoucher(id);
    }

    @Put('/undelete/:id')
    @ApiBearerAuth()
    async unDelete(@Param('id') id: string) {
        return await this.ticketVoucherService.unDeleteTicketVoucher(id);
    }
    
}