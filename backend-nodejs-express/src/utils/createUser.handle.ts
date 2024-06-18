import { Persona } from "./../models/persona";

import { Row } from "../interfaces/upload.interface";
import { Rol } from "../models/rol";
import { Usuario } from "../models/usuario";
import { encrypt } from "./bcrypt.handle";
import { generarCorreoUnico } from "../helpers/usuario.helper";

export const createUser = async (row: Row, i: number) => {
  try {
    const {
      username,
      nombres,
      apellidos,
      identificacion,
      fecha_nacimiento,
      rolid,
    } = row;

    const rol = await Rol.findOne({ where: { rolid: rolid } });

    if (rol) {
      const fecha = new Date(fecha_nacimiento);
      if (isNaN(fecha.getTime())) {
        return  { ubicacion: `Fila ${3}`, error: "Fecha de nacimiento inválida" };
      }
      const persona = Persona.create({
        nombres,
        apellidos,
        identificacion,
        fecha_nacimiento: fecha,
      });
      await persona.save();

      const passHash = await encrypt(String(identificacion));

      const correo = await generarCorreoUnico(nombres, apellidos);

      const usuario = Usuario.create({
        correo: correo,
        username: username,
        contrasena: passHash,
        rol,
        persona,
        estado: true,
      });
      await usuario.save();
      return usuario;
    }
  } catch (e) {
    if (e instanceof Error) {
      return {
        ubicacion: `Fila ${i + 2}`,
        error: `Error al guardar el usuario: ${e.message}`,
      };
    }
  }
};
