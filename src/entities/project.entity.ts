import { BaseEntity } from "src/common/base/entity.base";
import { Column, Entity, ManyToOne } from "typeorm";
import { AccountEntity } from "./account.entity";


@Entity({
    name: "PROJECT",
})
export class ProjectEntity extends BaseEntity {

    @Column({
        name: "projectName",
        type: "varchar",
        length: 100,
        nullable: false,
    })
    projectName: string;

    @Column({
        name: "Description",
        type: "text",
        nullable: false,
    })
    description: string;

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
        name: "status",
        type: "boolean",
        nullable: false,
    })
    status: boolean;

    @ManyToOne(() => AccountEntity, (acc) => acc.email)
    createdBy: AccountEntity

}