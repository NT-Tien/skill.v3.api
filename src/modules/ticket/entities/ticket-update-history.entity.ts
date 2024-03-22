import { BaseEntity } from "src/common/base/entity.base";
import { Column, Entity, ManyToMany } from "typeorm";
import { TicketEntity } from "./ticket.entity";

@Entity({
    name: "TICKET_UPDATE_HISTORY",
})
export class TicketUpdateHistoryEntity extends BaseEntity {

    @ManyToMany(() => TicketEntity, ticket => ticket.id)
    ticket: TicketEntity;

    @Column({
        name: "description",
        type: "text",
        nullable: false,
    })
    description: string;

}