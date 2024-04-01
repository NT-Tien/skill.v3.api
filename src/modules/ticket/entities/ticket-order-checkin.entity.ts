import { BaseEntity } from "src/common/base/entity.base";
import { Column, Entity } from "typeorm";


@Entity({
    name: "TICKET_ORDER_CHECKIN_ITEM",
})
export class TicketOrderCheckinEntity extends BaseEntity {

    @Column({
        name: "idOrder",
        type: "uuid",
        nullable: false,
    })
    idOrder: string;

    @Column({
        name: "idItem",
        type: "uuid",
        nullable: false,
    })
    idItem: string;

}