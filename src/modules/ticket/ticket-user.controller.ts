import { Body, Controller, Delete, Get, Inject, Param } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { TicketService } from "./ticket.service";

@ApiTags('ticket-user')
@Controller('ticket-user')
export class TicketUserController {
    constructor(
        @Inject('TICKET_SERVICE_TIENNT') private ticketService: TicketService
    ) { }

    @Get()
    async getAll() {
        return await this.ticketService.getTickets();
    }

    @Get('/:id')
    async getOne(@Param('id') id: string) {
        return await this.ticketService.getTicketById(id);
    }

}