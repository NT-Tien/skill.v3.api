import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";
import { TicketEntity } from "./entities/ticket.entity";
import { TicketService } from "./ticket.service";
import { TicketController } from "./ticket.controller";
import { TicketVoucherEntity } from "./entities/ticket-voucher.entity";
import { TicketVoucherService } from "./ticket-voucher/ticket-voucher.service";
import { TicketVoucherController } from "./ticket-voucher/ticket-voucher.controller";
import { TicketVoucherUserController } from "./ticket-voucher/ticket-voucher-user.controller";
import { BullModule } from "@nestjs/bull";
import { TicketOrderProcessor } from "./ticket-order/ticket-order.process";
import { TicketOrderController } from "./ticket-order/ticket-order.controller";
import { TicketOrderUserController } from "./ticket-order/ticket-order-user.controller";

@Module({
    imports:[
        TypeOrmModule.forFeature([TicketEntity, TicketVoucherEntity]),
        BullModule.registerQueue({name: 'ticket-order-queue'}),
        AuthModule,
    ],
    providers: [
        {
            provide: 'TICKET_SERVICE_TIENNT',
            useClass: TicketService,
        },
        {
            provide: 'TICKET_VOUCHER_SERVICE_TIENNT',
            useClass: TicketVoucherService,
        },
        {
            provide: 'TICKET_ORDER_SERVICE_TIENNT',
            useClass: TicketService,
        },
        TicketOrderProcessor
    ],
    controllers: [
        TicketController,
        TicketVoucherController,
        TicketVoucherUserController,
        TicketOrderController,
        TicketOrderUserController,
    ]
})
export class TicketModule {}