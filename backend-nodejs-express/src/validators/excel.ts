import { Usuario } from "../models/usuario";
import { Row } from "../interfaces/upload.interface";
import { Rol } from "../models/rol";
import { Persona } from "../models/persona";

export const validateUserExcel = async (row: Row, i: number) => {
  const {
    username,
    nombres,
    apellidos,
    identificacion,
    fecha_nacimiento,
    rolid,
  } = row;
  const errores = [];

  if (!username) {
    errores.push({
      ubicacion: `A${i + 2}`,
      error: "El campo username es requerido",
    });
  } else {
    if (username.length < 8 || username.length > 20) {
      errores.push({
        ubicacion: `A${i + 2}`,
        error: "El nombre de usuario debe tener entre 8 y 20 caracteres",
      });
    }
    if (!/^[a-zA-Z0-9]*$/.test(username)) {
      errores.push({
        ubicacion: `A${i + 2}`,
        error: "El nombre de usuario no debe contener signos",
      });
    }
    if (!/[A-Z]/.test(username)) {
      errores.push({
        ubicacion: `A${i + 2}`,
        error:
          "El nombre de usuario debe contener al menos una letra mayúscula",
      });
    }
    if (!/[0-9]/.test(username)) {
      errores.push({
        ubicacion: `A${i + 2}`,
        error: "El nombre de usuario debe contener al menos un número",
      });
    }
    const user = await Usuario.findOne({ where: { username: username } });
    if (user) {
      errores.push({
        ubicacion: `A${i + 2}`,
        error: "Nombre de usuario ya existe",
      });
    }
  }
  if (!nombres) {
    errores.push({
      ubicacion: `B${i + 2}`,
      error: "El campo nombres es requerido",
    });
  }

  if (!apellidos) {
    errores.push({
      ubicacion: `C${i + 2}`,
      error: "El campo apellidos es requerido",
    });
  }
  if (!identificacion) {
    errores.push({
      ubicacion: `D${i + 2}`,
      error: "El campo identificacion es requerido",
    });
  } else {
    if (!/^\d{10}$/.test(identificacion)) {
      errores.push({
        ubicacion: `D${i + 2}`,
        error: "La identificación debe tener 10 dígitos",
      });
    }
    if (/(\d)\1{3,}/.test(identificacion)) {
      errores.push({
        ubicacion: `D${i + 2}`,
        error: "La identificación no debe tener 4 veces seguidas un número",
      });
    }
    const persona = await Persona.findOne({
      where: { identificacion: identificacion },
    });
    if (persona) {
      errores.push({
        ubicacion: `D${i + 2}`,
        error: "Identificacion ya existe",
      });
    }
  }
  if (!fecha_nacimiento) {
    errores.push({
      ubicacion: `E${i + 2}`,
      error: "El campo fecha_nacimiento es requerido",
    });
  }
  if (!rolid) {
    errores.push({
      ubicacion: `F${i + 2}`,
      error: "El campo rolid es requerido",
    });
  } else {
    const rol = await Rol.findOne({ where: { rolid: rolid } });
    if (!rol) {
      errores.push({ ubicacion: `F${i + 2}`, error: "Rol no existe" });
    }
  }

  return errores;
};
