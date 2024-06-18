import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity('productos')
export class Producto extends BaseEntity{
    @PrimaryGeneratedColumn()
    productoid: number;

    @Column()
    nombre: string;

    @Column()
    precio: number;

    @Column()
    stock: number;

    @Column()
    descripcion: string;

    @Column()
    imagen: string;
}