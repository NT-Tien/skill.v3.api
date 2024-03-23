import { HttpException, Injectable } from "@nestjs/common";
import * as dotenv from 'dotenv';
import * as crypto from 'crypto';
import { InjectRepository } from "@nestjs/typeorm";
import { TicketOrderWaiterEntity } from "../../entities/ticket-order-waiter.entity";
import { Repository } from "typeorm";

dotenv.config();

type payloadType = {
    orderId: string,
    orderCode: number,
    amount: number,
    description: string,
    buyerName: string,
    buyerEmail: string,
    buyerPhone: string,
    items: any // array of option product
}
@Injectable()
export class PayOSService {

    returnURL = 'https://e-furniture-swd.vercel.app';
    cancelURL = 'https://e-furniture-swd.vercel.app';

    constructor(
        @InjectRepository(TicketOrderWaiterEntity) private waiterRepository: Repository<TicketOrderWaiterEntity>
    ) { }


    async generateHmac(payload: payloadType) {
        var data = `amount=${payload.amount}&cancelUrl=${this.cancelURL}&description=${payload.description}&orderCode=${payload.orderCode}&returnUrl=${this.returnURL}`
        const checksum = process.env.PAYOS_CHECKSUM_KEY;
        const hmac = crypto.createHmac('sha256', checksum);
        hmac.update(data);
        return hmac.digest('hex');
    }
    // check order info and return link payment

    async createLinkPayment(payload: payloadType): Promise<any> {

        var hmac = await this.generateHmac(payload);
        return await fetch('https://api-merchant.payos.vn/v2/payment-requests', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-client-id': process.env.PAYOS_CLIENT_ID,
                'x-api-key': process.env.PAYOS_API_KEY,
            },
            body: JSON.stringify({
                ...payload,
                "cancelUrl": this.cancelURL,
                "returnUrl": this.returnURL,
                "expiredAt": Math.floor(Date.now() / 1000) + (10 * 60), // 10 minutes
                "signature": hmac
            }),
        })
            .then(response => response.json())
            .then(data => {
                this.waiterRepository.save({
                    paymentId: data?.data?.paymentLinkId,
                    orderId: payload?.orderId
                });
                return data;
            })
            .catch((error) => {
                throw new HttpException(error, 400);
            });
    }


}