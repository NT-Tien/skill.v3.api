import { Module } from "@nestjs/common";
import { PaymentController } from "./payment.controller";

@Module({
    imports:[],
    providers: [
    ],
    controllers: [PaymentController]
})
export class PaymentModule {}