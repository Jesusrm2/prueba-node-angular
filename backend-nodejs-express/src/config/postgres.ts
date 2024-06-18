import { DataSource } from "typeorm";
import { Usuario } from "../models/usuario";
import { Rol } from "../models/rol";
import { Persona } from "../models/persona";
import { Sesion } from "../models/sesion";
import dotenv from "dotenv";
import { Venta } from "../models/ventas";
import { Producto } from "../models/producto";
dotenv.config();
export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.HOST,
    port: Number(process.env.PORT_DB),
    username: process.env.USER,
    password: process.env.PASSWORD_BD,
    database: process.env.DATABASE,
    logging: true,
    entities: [Usuario, Rol, Persona, Sesion, Producto, Venta ],
    synchronize: true
});