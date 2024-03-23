import { BaseEntity } from "src/common/base/entity.base";
import { Column, Entity, Unique } from "typeorm";

export enum Role {
    admin = 'admin',
    staff = 'staff',
    user = 'user',
}

@Unique(["email"])
@Entity({
    name: "ACCOUNT",
})
export class AccountEntity extends BaseEntity {

    @Column({
        name: "Username",
        type: "varchar",
        length: 100,
        nullable: false,
    })
    username: string;

    @Column({
        name: "Email",
        type: "varchar",
        length: 100,
        nullable: false,
    })
    email: string;

    @Column({
        name: "Phone",
        type: "varchar",
        length: 20,
        nullable: true,
    })
    phone: string;

    @Column({
        name: "Password",
        type: "varchar",
        length: 100,
        nullable: false,
    })
    password: string;

    @Column({
        name: "Role",
        type: "enum",
        enum: Role,
        default: Role.user,
        nullable: false,
    })
    role: Role;

}