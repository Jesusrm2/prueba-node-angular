import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./usuario";
import { Producto } from "./producto";

@Entity('ventas')
export class Venta extends BaseEntity {
    @PrimaryGeneratedColumn()
    ventaid: number;
    
    @ManyToOne(() => Usuario, { eager: true, nullable: false })
    @JoinColumn({ name: "usuarioid" })
    usuario: Usuario;

    @ManyToOne(() => Producto , { eager: true, nullable: false })
    @JoinColumn({ name: "productoid" })
    producto: Producto;

    @Column()
    fecha: Date;

    @Column()
    total: number;

}