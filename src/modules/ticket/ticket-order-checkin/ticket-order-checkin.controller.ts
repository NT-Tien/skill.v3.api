import { Body, Controller, Inject, Param, Post, UseGuards } from "@nestjs/common";
import { TicketOrderCheckinServiceInterface } from "../interfaces/ticket-order-checkin.interface";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AddCheckinRecordDto } from "../dto/ticket-order-checkin/AddCheckinRecord.dto";
import { GetCheckinRecordsDto } from "../dto/ticket-order-checkin/get-checkin-record.dto";
import { AdminGuard } from "src/modules/auth/guards/admin.guard";

@ApiTags('ticket-order-checkin')
@UseGuards(AdminGuard)
@Controller('ticket-order-checkin')
export class TicketOrderCheckinController {
    constructor(
        @Inject('TICKET_ORDER_CHECKIN_SERVICE_TIENNT') private readonly ticketOrderCheckinService: TicketOrderCheckinServiceInterface
    ) { }

    // add checkin record when scan qr code
    @ApiBearerAuth()
    @Post('add-checkin-record')
    async addCheckinRecord(@Body() body: AddCheckinRecordDto) {
        return this.ticketOrderCheckinService.addCheckinRecord(body.idOrder, body.idItem);
    }

    // get checkin records of an order
    @ApiBearerAuth()
    @Post('get-checkin-records')
    async getCheckinRecords(@Body() body: GetCheckinRecordsDto) {
        return this.ticketOrderCheckinService.getCheckinRecords(body.idOrder);
    }

    // get all checkin records
    @ApiBearerAuth()
    @Post('get-all-checkin-records')
    async getAllCheckinRecords() {
        return this.ticketOrderCheckinService.getAllCheckinRecords();
    }
    
}