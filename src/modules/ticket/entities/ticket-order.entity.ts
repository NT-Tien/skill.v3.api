import { BaseEntity } from "src/common/base/entity.base";
import { Column, Entity, OneToMany } from "typeorm";
import { TicketOrderItemEntity } from "./ticket-order-item.entity";
import { TicketOrderCheckinEntity } from "./ticket-order-checkin.entity";

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
        name: "phone",
        type: "varchar",
        length: 15,
        nullable: false,
    })
    phone: string;

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
        nullable: true,
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

    @OneToMany(() => TicketOrderItemEntity, ticketOrderItem => ticketOrderItem.ticketOrder)
    items: TicketOrderItemEntity[];

    @Column({
        name: "project",
        type: "varchar",
        length: 100,
        nullable: true,
    })
    project: string;

}