import { IsNull } from "typeorm";
import {
  createSession,
  findUser,
  generarCorreoUnico,
  verifyPassword,
} from "../helpers/usuario.helper";
import { Sesion } from "../models/sesion";
import { Usuario } from "../models/usuario";
import { Request, Response } from "express";
import { Persona } from "../models/persona";
import { Rol } from "../models/rol";
import { encrypt } from "../utils/bcrypt.handle";
import { sendEmail } from "../utils/sendEmail.handle";

const loginUser = async (usuario: string, password: string) => {
  const user = await findUser(usuario);

  const userLogin = await Usuario.findOne({
    where: { usuarioid: user?.usuarioid },
  });

  if (!user) return { status: 404, message: "Usuario no encontrado" };
  else if (!user.estado)
    return { status: 403, message: "Usuario le quitaron el acceso al sistema" };
  else if (user.intentos >= 3)
    return {
      status: 403,
      message: "Usuario bloqueado por demasiados intentos de inicio de sesión",
    };

  const passworHash = user.contrasena;
  const isVerified = await verifyPassword(password, passworHash);

  if (!isVerified) {
    user.intentos += 1;
    await user.save();
    return { status: 403, message: "Contraseña incorrecta" };
  }

  const activeSession = await Sesion.findOne({
    where: { usuario: user, fecha_cierre: IsNull() },
  });
  if (activeSession) {
    return {
      status: 403,
      message: "Ya existe una sesión activa para este usuario",
    };
  }

  await createSession(user);
  return { status: 200, data: userLogin };
};

const registerUser = async (body: any) => {
  const {
    contrasena,
    rolId,
    nombres,
    username,
    apellidos,
    identificacion,
    fecha_nacimiento,
  } = body;
  const correo = await generarCorreoUnico(nombres, apellidos);

  const userByUsername = await Usuario.findOne({
    where: { username: username },
  });
  if (userByUsername)
    return { status: 409, message: "Nombre de usuario ya existe" };

  const rol = await Rol.findOne({ where: { rolid: rolId } });
  if (!rol) return { status: 404, message: "Rol no encontrado" };

  const person = await Persona.findOne({
    where: { identificacion: identificacion },
  });
  if (person) return { status: 409, message: "Persona ya registrada" };

  const passHash = await encrypt(contrasena);

  const newPerson = Persona.create({
    nombres,
    apellidos,
    identificacion,
    fecha_nacimiento,
  });
  await newPerson.save();

  const newUser = Usuario.create({
    correo,
    username,
    contrasena: passHash,
    rol,
    persona: newPerson,
    estado: true,
  });

  await newUser.save();
  return { status: 201, data: newUser };
};

const logoutUser = async (id: number) => {
  const user = await Usuario.findOne({ where: { usuarioid: Number(id) } });
  if (!user) return { status: 404, message: "Usuario no encontrado" };

  const activeSession = await Sesion.findOne({
    where: { usuario: user, fecha_cierre: IsNull() },
  });
  if (!activeSession)
    return {
      status: 404,
      message: "No hay sesiones activas para este usuario",
    };

  activeSession.fecha_cierre = new Date();
  await activeSession.save();

  return { status: 204, message: "Sesión cerrada" };
};

const verifyEmail = async (correo: string) => {
  if (!correo) return { status: 400, message: "Correo requerido" };
  const user = await Usuario.findOne({ where: { correo: correo } });
  if (!user) return { status: 404, message: "Usuario no encontrado" };

  const codigo = Math.floor(100000 + Math.random() * 900000).toString();
  user.codigo = codigo;
  await user.save();

  try {
    await sendEmail(
      user.correo,
      "Recuperar contraseña",
      `Su codigo de verificación es: ${codigo}`
    );
    return { status: 200, message: "Email enviado" };
  } catch (error) {
    return { status: 500, message: "Error al enviar email" };
  }
};

const recoverPassword = async (correo: string, codigo: string) => {
  if (!correo || !codigo)
    return { status: 400, message: "Correo y código requeridos" };

  const user = await Usuario.findOne({ where: { correo: correo } });
  if (!user) return { status: 404, message: "Usuario no encontrado" };
  if (user.codigo !== codigo)
    return { status: 403, message: "Código incorrecto" };

  const contrasena = Math.random().toString(36).slice(-8);

  const passHash = await encrypt(contrasena);

  user.contrasena = passHash;
  user.codigo = "";
  await user.save();

  try {
    await sendEmail(
      user.correo,
      "Recuperar contraseña",
      `Su nueva contraseña es: ${contrasena}`
    );
    return { status: 200, message: "Email enviado" };
  } catch (error) {
    return { status: 500, message: "Error al enviar email" };
  }
};

export { loginUser, registerUser, logoutUser, verifyEmail, recoverPassword };
