// // item.processor.ts
// import { Process, Processor } from '@nestjs/bull';
// import { Inject } from '@nestjs/common';
// import { Job } from 'bull';
// import { PaymentService } from './payment.service';

// @Processor('order-queue')
// export class OrderProcessor {
//     constructor(
//         @Inject('PAYMENT_SERVICE') private paymentService: PaymentService,
//     ) { }

//     @Process()
//     async processJob(job: Job<any>) {
//         const { data } = job;
//         return  await this.paymentService.createLinkPayment(data.data);
//     }
// }
