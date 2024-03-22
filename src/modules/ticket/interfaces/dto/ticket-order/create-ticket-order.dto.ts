import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class CreateTicketOrderDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    phone: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    total: number;

    @ApiProperty({
        required: false,
        description: 'Ticket Voucher ID',
        default: '',
    })
    ticketVoucher?: string;

    @ApiProperty({ 
        type: 'array',
        items: {
            type: 'object',
            properties: {
                ticketId: { type: 'string' },
                name: { type: 'string' },
                quantity: { type: 'number' },
                price: { type: 'number' }
            }
        }
    })
    @IsNotEmpty()
    items: any;


}