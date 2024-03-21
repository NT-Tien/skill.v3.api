import { BaseEntity } from "src/common/base/entity.base";
import { Column, Entity, Unique } from "typeorm";

export enum TicketOrderStatus {
    PENDING = 'PENDING',
    PAID = 'PAID',
    CANCELED = 'CANCELED',
    EXPIRED = 'EXPIRED'
}   
@Entity({
    name: "TICKET_ORDER",
})
export class TicketOrderEntity extends BaseEntity {

    @Column({
        name: "email",
        type: "varchar",
        length: 100,
        nullable: false,
    })
    email: string;

    @Column({
        name: "username",
        type: "varchar",
        length: 100,
        nullable: false,
    })
    username: string;

    @Column({
        name: "total",
        type: "float",
        nullable: false,
    })
    total: number;

    @Column({
        name: "ticketVoucher",
        type: 'jsonb',
        nullable: false,
    })
    ticketVoucher: any;

    @Column({
        name: "status",
        type: "enum",
        enum: TicketOrderStatus,
        default: TicketOrderStatus.PENDING,
    })
    status: TicketOrderStatus;

    @Column({
        name: "payment",
        type: 'jsonb',
        nullable: true,
    })
    payment: any;

    @Column({
        name: "items",
        type: "jsonb",
        nullable: false,
    })
    items: any;

}