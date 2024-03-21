import { Controller, Post } from "@nestjs/common";

@Controller('payment')
export class PaymentController {
    constructor() { }

    @Post('/zalopay/create-qrcode')
    async createZaloPayQrCode() {
        return 'ZaloPay QR Code';
    }
    
}