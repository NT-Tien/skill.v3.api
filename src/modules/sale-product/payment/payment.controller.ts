// import { Body, Controller, Get, HttpException, Inject, Param, Post } from "@nestjs/common";
// import { OrderEntity, PaymentOptions } from "src/entities/order.entity";
// import { ApiBody, ApiTags } from "@nestjs/swagger";
// import { InjectQueue } from "@nestjs/bull";
// import { Job, Queue } from 'bull';


// @ApiTags('payment')
// @Controller('payment')
// export class PaymentController {
//     constructor(
//         @InjectQueue('order-queue') private readonly orderQueue: Queue,
//     ) { }

//     @ApiBody({
//         schema: {
//             type: 'object',
//             properties: {
//                 username: { type: 'string' },
//                 phone: { type: 'string' },
//                 email: { type: 'string' },
//                 address: { type: 'string' },
//                 total: { type: 'number' },
//                 products: {
//                     type: 'array',
//                     items: {
//                         type: 'object',
//                         properties: {
//                             id: { type: 'string' },
//                             name: { type: 'string' },
//                             name_product: { type: 'string' },
//                             quantity: { type: 'number' },
//                             price: { type: 'number' },
//                         }
//                     }
//                 },
//                 type_payment: { type: 'enum', enum: Object.values(PaymentOptions) },
//             }
//         }
//     })
//     @Post('create-link')
//     async createLinkPayment(@Body() order: OrderEntity) {
//         return await this.orderQueue.add({ data: order } as Job<any>, { delay: 3000 });
//         // return await this.paymentService.createLinkPayment(order);
//     }

//     @Get('get-link/:jobId')
//     async getLinkPayment(@Param('jobId') jobId: string){
//         return await  this.orderQueue.getJob(jobId);
//     }

//     // @Get('test-send-mail')
//     // async testSendMail() {
//     //     return await this.paymentService.sendMailForUserPaid(null);
//     // }

// }