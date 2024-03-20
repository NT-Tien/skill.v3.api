// import { Inject, Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import * as dotenv from 'dotenv';
// import { BaseService } from 'src/common/base.service';
// import { WaiterPaymentEntity } from 'src/entities/waiter.payment.entity';
// import { ProductOptService } from '../../../../../skill-v2/skillcetera-api/src/modules/product/opt/product.opt.service';
// import { OrderService } from '../../../../../skill-v2/skillcetera-api/src/modules/order/order.service';
// import { Repository } from 'typeorm';
// import { OrderStatus } from 'src/entities/order.entity';
// import { Interval } from '@nestjs/schedule';
// import { sendMailForUserPaid } from './payment.mail';
// dotenv.config();

// type payloadType = {
//     orderCode: number,
//     amount: number,
//     description: string,
//     buyerName: string,
//     buyerEmail: string,
//     buyerPhone: string,
//     items: any // array of option product
// }

// @Injectable()
// export class PaymentCronService extends BaseService<WaiterPaymentEntity>{

//     constructor(
//         @InjectRepository(WaiterPaymentEntity) private waiterPaymentRepository: Repository<WaiterPaymentEntity>,
//         @Inject('PRODUCT_OPT_SERVICE') private productOptService: ProductOptService,
//         @Inject('ORDER_SERVICE') private orderService: OrderService,
//     ) {
//         super(waiterPaymentRepository);
//     }

//     async checkIdOrder(idOrder: string): Promise<any> {
//         return fetch(`https://api-merchant.payos.vn/v2/payment-requests/${idOrder}`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'x-client-id': process.env.PAYOS_CLIENT_ID,
//                 'x-api-key': process.env.PAYOS_API_KEY,
//             },
//         })
//             .then(response => response.json())
//             .then(data => {
//                 return data;
//             })
//             .catch((error) => {
//                 return JSON.stringify(error);
//             });
//     }

//     @Interval(1 * 60 * 1000)
//     async checkPayment() {
//         var waiters = await this.getAll();
//         for (let i = 0; i < waiters.length; i++) {
//             setTimeout(async () => {
//                 console.log('Checking payment', waiters[i].id);
//                 var waiter = waiters[i];
//                 var result = await this.checkIdOrder(waiter.payment_id);
//                 try {
//                     await this.handleWaiter(waiter, result);
//                 } catch (error) {
//                     console.log(error);
//                     console.log('Error handle water: ', waiter.id);
//                 }
//             }, 1000 * i)
//         }
//     }

//     private async handleWaiter(waiter: WaiterPaymentEntity, result: any) {
//         var order = await this.orderService.getOne(waiter.order_id);
//         if (result.data.status === 'PAID') {
//             // update order status
//             await this.orderService.update(waiter.order_id, {
//                 payment: result.data,
//                 status: OrderStatus.PAID
//             });
//             // delete waiter
//             await this.delete(waiter.id);
//             await sendMailForUserPaid({
//                 total: order.total,
//                 products: order.products,
//                 ussername: order.username,
//                 address: order.address,
//                 phone: order.phone,
//                 email: order.email
//             })
//         } else if (result.data.status === 'EXPIRED') {
//             // increase products quantity back to stock
//             for (let i = 0; i < order.products.length; i++) {
//                 const product = order.products[i];
//                 await this.productOptService.increaseProductQuantity(product.id, product.quantity);
//             }
//             // delete order
//             await this.orderService.delete(waiter.order_id);
//             // delete waiter
//             await this.delete(waiter.id);
//         }
//     }
// }


// // {
// //     "code": "00",
// //     "desc": "success",
// //     "data": {
// //         "id": "ac7eef1937a041749078b793840dbd79",
// //         "orderCode": 1704795585110,
// //         "amount": 4000,
// //         "amountPaid": 4000,
// //         "amountRemaining": 0,
// //         "status": "PAID",
// //         "createdAt": "2024-01-09T17:19:45+07:00",
// //         "transactions": [
// //             {
// //                 "reference": "FT24009614024000",
// //                 "amount": 4000,
// //                 "accountNumber": "0559330072",
// //                 "description": "TTH5HVK5 ",
// //                 "transactionDateTime": "2024-01-09T17:20:21+07:00",
// //                 "virtualAccountName": "NGUYEN TRONG TIEN",
// //                 "virtualAccountNumber": null,
// //                 "counterAccountBankId": null,
// //                 "counterAccountBankName": null,
// //                 "counterAccountName": null,
// //                 "counterAccountNumber": null
// //             }
// //         ],
// //         "canceledAt": null,
// //         "cancellationReason": null
// //     },
// //     "signature": "213612009149c8026469e5e9c7e3034f9303cc0100ae697cf77f6d7ed9521b27"
// // }

// // {
// //     "code": "00",
// //     "desc": "success",
// //     "data": {
// //         "id": "6d94681ba2a44f85860e28d7400ce66c",
// //         "orderCode": 1704789866282,
// //         "amount": 12000,
// //         "amountPaid": 0,
// //         "amountRemaining": 12000,
// //         "status": "EXPIRED",
// //         "createdAt": "2024-01-09T15:44:27+07:00",
// //         "transactions": [],
// //         "canceledAt": null,
// //         "cancellationReason": null
// //     },
// //     "signature": "60b5cc7f0ae55cebff5c50d9d7d4dd73e29ca91db63bd282d989165fc229d3f9"
// // }