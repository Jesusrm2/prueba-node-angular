import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('roles')
export class Rol extends BaseEntity {
    @PrimaryGeneratedColumn()
    rolid: number;

    @Column()
    rolname: string;

}

