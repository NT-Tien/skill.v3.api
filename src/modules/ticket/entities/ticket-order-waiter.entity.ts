import { BaseEntity } from "src/common/base/entity.base";
import { Column, Entity, ManyToMany } from "typeorm";
import { TicketOrderEntity } from "./ticket-order.entity";
import { TicketEntity } from "./ticket.entity";


@Entity({
    name: "TICKET_ORDER_WAITER",
})
export class TicketOrderWaiterEntity extends BaseEntity {

    @Column({
        name: "order_id",
        type: "varchar",
        nullable: false,
    })
    orderId: string;

    @Column({
        name: "payment_id",
        type: "varchar",
        nullable: false,
    })
    paymentId: string;

}