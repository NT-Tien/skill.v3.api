import { BaseEntity } from "src/common/base/entity.base";
import { Column, Entity, ManyToOne } from "typeorm";
import { ProjectEntity } from "./project.entity";


@Entity({
    name: "TICKET",
})
export class TicketVoucherEntity extends BaseEntity {

    @Column({
        name: "projectName",
        type: "varchar",
        length: 100,
        nullable: false,
    })
    ticketVoucherName: string;

    @Column({
        name: "Description",
        type: "text",
        nullable: false,
    })
    description: string;

    @Column({
        name: " quantity",
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

    @ManyToOne(() => ProjectEntity, (pro) => pro.id)
    project: ProjectEntity

}