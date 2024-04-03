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
import { TicketOrderEntity } from "./entities/ticket-order.entity";
import { TicketOrderItemEntity } from "./entities/ticket-order-item.entity";
import { TicketOrderCheckinEntity } from "./entities/ticket-order-checkin.entity";
import { TicketOrderService } from "./ticket-order/ticket-order.service";
import { PayOSService } from "./ticket-order/payment/payos.service";
import { WaiterService } from "./ticket-order/payment/waiter.cront";
import { TicketOrderWaiterEntity } from "./entities/ticket-order-waiter.entity";
import { TicketOrderCheckinController } from "./ticket-order-checkin/ticket-order-checkin.controller";
import { TicketOrderCheckinService } from "./ticket-order-checkin/ticket-order-checkin.service";
import { TicketUserController } from "./ticket-user.controller";

@Module({
    imports:[
        TypeOrmModule.forFeature([
            TicketEntity,
            TicketVoucherEntity,
            TicketOrderEntity,
            TicketOrderItemEntity,
            TicketOrderCheckinEntity,
            TicketOrderWaiterEntity,
        ]),
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
            useClass: TicketOrderService,
        },
        TicketOrderProcessor,
        {
            provide: 'PAYOS_SERVICE_TIENNT',
            useClass: PayOSService,
        },
        WaiterService,
        {
            provide: 'TICKET_ORDER_CHECKIN_SERVICE_TIENNT',
            useClass: TicketOrderCheckinService,
        },
    ],
    controllers: [
        TicketController,
        TicketUserController,
        TicketVoucherController,
        TicketVoucherUserController,
        TicketOrderController,
        TicketOrderUserController,
        TicketOrderCheckinController,
    ]
})
export class TicketModule {}