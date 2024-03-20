// import { HttpException, Inject, Injectable, Scope } from "@nestjs/common";
// import { InjectRepository } from "@nestjs/typeorm";
// import { BaseService } from "src/common/base.service";
// import { WaiterPaymentEntity } from "src/entities/waiter.payment.entity";
// import { Repository } from "typeorm";
// import * as dotenv from 'dotenv';
// import * as crypto from 'crypto';
// import { OrderEntity } from "src/entities/order.entity";
// import { OrderService } from "../../../../../skill-v2/skillcetera-api/src/modules/order/order.service";
// import { ProductOptionEntity } from "src/entities/product.opt.entity";
// import { ProductOptService } from "../../../../../skill-v2/skillcetera-api/src/modules/product/opt/product.opt.service";
// // import { ProductOptServiceTransaction } from "../product/opt/product.opt.transaction.service";
// import { sendMailForUserPaid } from "./payment.mail";
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
// export class PaymentService extends BaseService<WaiterPaymentEntity>{

//     returnURL = 'http://localhost:3000';
//     cancelURL = 'https://localhost:3000';

//     constructor(
//         @InjectRepository(WaiterPaymentEntity) private waiterPaymentRepository: Repository<WaiterPaymentEntity>,
//         // @Inject('PRODUCT_OPT_SERVICE_TRANSACTION') private productOptServiceTransaction: ProductOptServiceTransaction,
//         @Inject('PRODUCT_OPT_SERVICE') private productOptService: ProductOptService,
//         @Inject('ORDER_SERVICE') private orderService: OrderService,
//     ) {
//         super(waiterPaymentRepository);
//     }

//     private async generateHmac(payload: payloadType) {
//         var data = `amount=${payload.amount}&cancelUrl=${this.cancelURL}&description=${payload.description}&orderCode=${payload.orderCode}&returnUrl=${this.returnURL}`
//         const checksum = process.env.PAYOS_CHECKSUM_KEY;
//         const hmac = crypto.createHmac('sha256', checksum);
//         hmac.update(data);
//         return hmac.digest('hex');
//     }

//     private async handleProductInfo(products: ProductOptionEntity[]) {
//         return await this.productOptService.handleOrderProductOpt(products);
//     }

//     async createLinkPayment(order: OrderEntity): Promise<any> {
//         var condition = await this.handleProductInfo(order.products);
//         if ((order.total !== order.products.reduce((acc, cur) => acc + cur.price * cur.quantity, 0)) || !condition) {
//             throw new HttpException('Total is not valid', 400);
//         } else {            // setup payload
//             var payload: payloadType = {
//                 orderCode: Date.now(),
//                 amount: order.total,
//                 description: order.phone.substring(0, 10),// get 10 first characters
//                 buyerName: "NGUYEN TRONG TIEN",
//                 buyerEmail: "test.dev@gmail.com",
//                 buyerPhone: "0123456789",
//                 items: order.products
//             }
//             // generate hmac
//             var hmac = await this.generateHmac(payload);
//             var result = await fetch('https://api-merchant.payos.vn/v2/payment-requests', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'x-client-id': process.env.PAYOS_CLIENT_ID,
//                     'x-api-key': process.env.PAYOS_API_KEY,
//                 },
//                 body: JSON.stringify({
//                     ...payload,
//                     "cancelUrl": this.cancelURL,
//                     "returnUrl": this.returnURL,
//                     "expiredAt": Math.floor(Date.now() / 1000) + 60, // 5 minutes
//                     "signature": hmac
//                 }),
//             })
//                 .then(response => response.json())
//                 .then(data => data)
//                 .catch((error) => {
//                     throw new HttpException(error, 400);
//                 });
//             var orderCreated = await this.orderService.create(order);
//             var waiter = {
//                 payment_id: result.data.paymentLinkId,
//                 order_id: orderCreated.id,
//             } as WaiterPaymentEntity;
//             await this.create(waiter);
//             return result;
//         }
//     }


//     async sendMailForUserPaid(payload: any) {
//         return sendMailForUserPaid(payload);
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