import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('personas')

export class Persona extends BaseEntity{

    @PrimaryGeneratedColumn()
    personaid: number;

    @Column({ nullable: false })
    nombres: string;
  
    @Column({ nullable: false })
    apellidos: string;

    @Column({ nullable: false })
    identificacion: string;

    @Column({ nullable: false })
    fecha_nacimiento: Date;
    
}
