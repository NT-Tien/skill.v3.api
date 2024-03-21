import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AdminGuard } from "../auth/guards/admin.guard";
import { TicketService } from "./ticket.service";
import { CreateTicketDto } from "./interfaces/dto/ticket/create-ticket.dto";
import { UpdateTicketDto } from "./interfaces/dto/ticket/update-ticket.dto";

@ApiTags('ticket')
@UseGuards(AdminGuard)
@Controller('ticket')
export class TicketController {
    constructor(
        @Inject('TICKET_SERVICE_TIENNT') private ticketService: TicketService
    ) { }

    @Get()
    @ApiBearerAuth()
    async getAll() {
        return await this.ticketService.getTickets();
    }

    @Get('/:id')
    @ApiBearerAuth()
    async getOne(@Param('id') id: string) {
        return await this.ticketService.getTicketById(id);
    }

    @Post()
    @ApiBearerAuth()
    async create(@Body() data: CreateTicketDto) {
        return await this.ticketService.createTicket(data);
    }

    @Put('/:id')
    @ApiBearerAuth()
    async update(@Param('id') id: string, @Body() data: UpdateTicketDto) {
        return await this.ticketService.updateTicket(id, data);
    }

    @Delete('/:id')
    @ApiBearerAuth()
    async delete(@Param('id') id: string) {
        return await this.ticketService.softDeleteTicket(id);
    }

    @Put('/undelete/:id')
    @ApiBearerAuth()
    async unDelete(@Param('id') id: string) {
        return await this.ticketService.unDeleteTicket(id);
    }
    
}