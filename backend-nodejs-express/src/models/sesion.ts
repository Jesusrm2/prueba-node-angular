import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Usuario } from "./usuario";

@Entity('sesiones')
export class Sesion extends BaseEntity {
    @PrimaryGeneratedColumn()
    sesionid: number;

    @Column({ nullable: false })
    fecha_ingreso: Date;    

    @Column({ nullable: true })
    fecha_cierre: Date;

    @ManyToOne(() => Usuario, { eager: true, nullable: false })
    @JoinColumn({ name: 'usuarioid' })
    usuario: Usuario;
  

}

