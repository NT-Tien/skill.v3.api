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
        name: "description",
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

    @Column({
        name: "image",
        type: "varchar",
        length: 100,
        nullable: true,
    })
    image: string;

    // ! related to ticket-apply project

    @Column({
        name: "project",
        type: "varchar",
        length: 100,
        nullable: true,
    })
    project: string; // only for one project, if it is null, it means it is for all projects


}