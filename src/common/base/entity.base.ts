import { BeforeUpdate, Column, PrimaryGeneratedColumn } from "typeorm";

export abstract class BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        name: "createdAt",
        type: "timestamp",
        nullable: false,
        default: () => "CURRENT_TIMESTAMP",
    })
    createdAt: Date;

    @Column({
        name: "updatedAt",
        type: "timestamp",
        nullable: false,
        default: () => "CURRENT_TIMESTAMP",
    })
    updatedAt: Date;

    @Column({
        name: "deletedAt",
        type: "timestamp",
        nullable: true,
    })
    deletedAt: Date;

    @BeforeUpdate()
    beforeUpdate() {
        // Chặn cập nhật trường primary key
        if (this.id !== this.id) {
            throw new Error('Cannot update primary key (id)');
        }
    }
}