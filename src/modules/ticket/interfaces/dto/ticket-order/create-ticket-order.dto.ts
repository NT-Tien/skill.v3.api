import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTicketOrderDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    total: number;

    @ApiProperty({
        required: false,
        default: 'Voucher code',
    })
    ticketVoucher?: string;

    @ApiProperty({ 
        type: 'array',
        items: {
            type: 'object',
            properties: {
                ticketId: { type: 'string' },
                ticketName: { type: 'string' },
                quantity: { type: 'number' },
                price: { type: 'number' }
            }
        }
    })
    @IsNotEmpty()
    items: any;


}