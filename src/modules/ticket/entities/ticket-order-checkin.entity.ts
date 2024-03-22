import { BaseEntity } from "src/common/base/entity.base";
import { Column, Entity, ManyToMany } from "typeorm";
import { TicketOrderEntity } from "./ticket-order.entity";
import { TicketEntity } from "./ticket.entity";


@Entity({
    name: "TICKET_ORDER_CHECKIN_ITEM",
})
export class TicketOrderCheckinEntity extends BaseEntity {

    @ManyToMany(() => TicketOrderEntity, ticketOrder => ticketOrder.id)
    ticketOrder: TicketOrderEntity;

    @ManyToMany(() => TicketEntity, ticket => ticket.id)
    ticket: TicketOrderEntity;

    @Column({
        name: "qrCode",
        type: "jsonb",
        nullable: false,
    })
    qrCode: JSON;

    @Column({
        name: "checkin",
        type: "boolean",
        nullable: false,
        default: false,
    })
    checkin: boolean;

}