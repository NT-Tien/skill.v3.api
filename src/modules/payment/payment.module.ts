// import { Module } from "@nestjs/common";
// import { TypeOrmModule } from "@nestjs/typeorm";
// import { WaiterPaymentEntity } from "src/entities/waiter.payment.entity";
// import { PaymentController } from "./payment.controller";
// import { PaymentService } from "./payment.service";
// import { ProductModule } from "../../../../../skill-v2/skillcetera-api/src/modules/product/product.module";
// import { OrderModule } from "../../../../../skill-v2/skillcetera-api/src/modules/order/order.module";
// import { ScheduleModule } from "@nestjs/schedule";
// import { PaymentCronService } from "./payment.cron";
// import { OrderProcessor } from "./payment.processor";
// import { BullModule } from "@nestjs/bull";
// import * as dotenv from 'dotenv';
// dotenv.config();

// @Module({
//     imports: [
//         BullModule.forRoot({
//             redis: {
//                 host: process.env.REDIS_HOST,
//                 port: parseInt(process.env.REDIS_PORT),
//                 password: process.env.REDIS_PASSWORD,
//             },
//         }),
//         BullModule.registerQueue({
//             name: 'order-queue',
//         }),
//         TypeOrmModule.forFeature([WaiterPaymentEntity]),
//         ScheduleModule.forRoot(),
//         ProductModule,
//         OrderModule
//     ],
//     controllers: [PaymentController],
//     providers: [
//         {
//             provide: 'PAYMENT_SERVICE',
//             useClass: PaymentService
//         },
//         PaymentCronService,
//         OrderProcessor,
//     ],
// })
// export class PaymentModule { }