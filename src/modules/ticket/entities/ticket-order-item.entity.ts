import { BaseEntity } from "src/common/base/entity.base";
import { Column, Entity, ManyToOne } from "typeorm";
import { TicketOrderEntity } from "./ticket-order.entity";
import { TicketEntity } from "./ticket.entity";


@Entity({
    name: "TICKET_ORDER_ITEM",
})
export class TicketOrderItemEntity extends BaseEntity {

    @ManyToOne(() => TicketOrderEntity, ticketOrder => ticketOrder.id)
    ticketOrder: string;

    @ManyToOne(() => TicketEntity, ticket => ticket.id)
    ticket: string;

    @Column({
        name: "name",
        type: "varchar",
        length: 255,
        nullable: false,
    })
    name: string;

    @Column({
        name: "quantity",
        type: "int",
        nullable: false,
    })
    quantity: number;

    @Column({
        name: "price",
        type: "float",
        nullable: false,
    })
    price: number;

}