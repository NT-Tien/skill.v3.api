import { BaseEntity } from "src/common/base/entity.base";
import { Column, Entity, Unique } from "typeorm";

@Unique(["voucherCode"])
@Entity({
    name: "TICKET_VOUCHER",
})
export class TicketVoucherEntity extends BaseEntity {

    @Column({
        name: "voucherCode",
        type: "varchar",
        length: 100,
        nullable: false,
    })
    voucherCode: string;

    @Column({
        name: "discount",
        type: "float",
        nullable: false,
    })
    discount: number;

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
        name: "applyTicketId",
        type: "varchar",
        array: true,
    })
    applyTicketId: string[]; // if applyTicketId is null, it means that this voucher is applied to all tickets

    @Column({
        name: "applyEmail",
        type: "varchar",
        array: true,
    })
    applyEmail: string[]; // if applyEmail is null, it means that this voucher is applied to all users

}