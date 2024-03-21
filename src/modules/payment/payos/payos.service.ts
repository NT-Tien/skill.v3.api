// import { HttpException, Inject, Injectable } from "@nestjs/common";
// import * as dotenv from 'dotenv';
// import * as crypto from 'crypto';

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
// export class PayOSService {

//     returnURL = 'https://e-furniture-swd.vercel.app';
//     cancelURL = 'https://e-furniture-swd.vercel.app';


//     async generateHmac(payload: payloadType) {
//         var data = `amount=${payload.amount}&cancelUrl=${this.cancelURL}&description=${payload.description}&orderCode=${payload.orderCode}&returnUrl=${this.returnURL}`
//         const checksum = process.env.PAYOS_CHECKSUM_KEY;
//         const hmac = crypto.createHmac('sha256', checksum);
//         hmac.update(data);
//         return hmac.digest('hex');
//     }
//     // check order info and return link payment

//     async createLinkPayment(payload: payloadType): Promise<any> {

//         // setup payload
//         var payload: payloadType = {
//             orderCode: Date.now(),
//             amount: 10000,
//             description: '0123456789',
//             buyerName: "NGUYEN TRONG TIEN",
//             buyerEmail: "test.dev@gmail.com",
//             buyerPhone: "0123456789",
//             items: [
//                 {
//                     "id": "string",
//                     "product_id": "string",
//                     "name": "string",
//                     "material": "string",
//                     "price": 1000,
//                     "quantity": 10
//                 }
//             ]
//         }
//         // generate hmac
//         var hmac = await this.generateHmac(payload);
//         return await fetch('https://api-merchant.payos.vn/v2/payment-requests', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'x-client-id': process.env.PAYOS_CLIENT_ID,
//                 'x-api-key': process.env.PAYOS_API_KEY,
//             },
//             body: JSON.stringify({
//                 ...payload,
//                 "cancelUrl": this.cancelURL,
//                 "returnUrl": this.returnURL,
//                 "expiredAt": Math.floor(Date.now() / 1000) + (2 * 60), // 5 minutes
//                 "signature": hmac
//             }),
//         })
//             .then(response => response.json())
//             .then(data => {
//                 console.log(data);
//             })
//             .catch((error) => {
//                 throw new HttpException(error, 400);
//             });
//     }


//     // check status order  after 5 minutes
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