import { BaseEntity } from "src/common/base/entity.base";
import { Column, Entity, ManyToMany } from "typeorm";
import { TicketOrderEntity } from "./ticket-order.entity";
import { TicketEntity } from "./ticket.entity";


@Entity({
    name: "TICKET_ORDER_ITEM",
})
export class TicketOrderItemEntity extends BaseEntity {

    @ManyToMany(() => TicketOrderEntity, ticketOrder => ticketOrder.id)
    ticketOrder: TicketOrderEntity;

    @ManyToMany(() => TicketEntity, ticket => ticket.id)
    ticket: TicketOrderEntity;

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