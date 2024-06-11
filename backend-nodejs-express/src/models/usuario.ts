import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Rol } from "./rol";
import { Persona } from "./persona";

@Entity("usuarios")
export class Usuario extends BaseEntity {
  @PrimaryGeneratedColumn()
  usuarioid: number;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  correo: string;

  @Column({ nullable: false })
  contrasena: string;

  @Column({ nullable: false })
  estado: boolean;


  @Column({ nullable: true })
  codigo: string;

  @Column({ nullable: true })
  intentos: number;

  @ManyToOne(() => Rol, { eager: true, nullable: false })
  @JoinColumn({ name: "rolid" })
  rol: Rol;

  @ManyToOne(() => Persona, { eager: true, nullable: false })
  @JoinColumn({ name: "personaid" })
  persona: Persona;
}
