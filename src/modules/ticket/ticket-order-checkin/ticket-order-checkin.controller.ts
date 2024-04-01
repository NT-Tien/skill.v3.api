import { Body, Controller, Inject, Param, Post } from "@nestjs/common";
import { TicketOrderCheckinServiceInterface } from "../interfaces/ticket-order-checkin.interface";
import { ApiTags } from "@nestjs/swagger";
import { AddCheckinRecordDto } from "../interfaces/dto/ticket-order-checkin/AddCheckinRecord.dto";
import { GetCheckinRecordsDto } from "../interfaces/dto/ticket-order-checkin/get-checkin-record.dto";

@ApiTags('ticket-order-checkin')
@Controller('ticket-order-checkin')
export class TicketOrderCheckinController {
    constructor(
        @Inject('TICKET_ORDER_CHECKIN_SERVICE_TIENNT') private readonly ticketOrderCheckinService: TicketOrderCheckinServiceInterface
    ) { }

    // add checkin record when scan qr code
    @Post('add-checkin-record')
    async addCheckinRecord(@Body() body: AddCheckinRecordDto) {
        return this.ticketOrderCheckinService.addCheckinRecord(body.idOrder, body.idItem);
    }

    // get checkin records of an order
    @Post('get-checkin-records')
    async getCheckinRecords(@Body() body: GetCheckinRecordsDto) {
        return this.ticketOrderCheckinService.getCheckinRecords(body.idOrder);
    }

    // get checkin record by id
    @Post('get-checkin-record-by-id/:id')
    async getCheckinRecordById(@Param('id') id: string) {
        return this.ticketOrderCheckinService.getCheckinRecordById(id);
    }
}