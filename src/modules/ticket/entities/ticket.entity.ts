import { BaseEntity } from "src/common/base/entity.base";
import { Column, Entity, Unique } from "typeorm";

@Unique(["ticketName"])
@Entity({
    name: "TICKET",
})
export class TicketEntity extends BaseEntity {

    @Column({
        name: "ticketName",
        type: "varchar",
        length: 100,
        nullable: false,
    })
    ticketName: string;

    @Column({
        name: "Description",
        type: "text",
        nullable: false,
    })
    description: string;

    @Column({
        name: "price",
        type: "float",
        nullable: false,
    })
    price: number; 

    @Column({
        name: "quantity",
        type: "int",
        nullable: false,
    })
    quantity: number;

    @Column({
        name: "startDate",
        type: "timestamp",
        nullable: false,
    })
    startDate: Date;

    @Column({
        name: "endDate",
        type: "timestamp",
        nullable: false,
    })
    endDate: Date;

}