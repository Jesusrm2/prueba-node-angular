import { Request, Response } from "express";
import { Usuario } from "../models/usuario";
import { httpError } from "../utils/error.handle";
import { Rol } from "../models/rol";
import { encrypt, verified } from "../utils/bcrypt.handle";

import { Persona } from "../models/persona";
import { IsNull } from "typeorm";
import { sendEmail } from "../utils/sendEmail.handle";
import { Sesion } from "../models/sesion";
import { createSession, findUser, generarCorreoUnico, verifyPassword } from "../helpers/usuario.helper";

const loginCtrl = async (req: Request, res: Response) => { 
  try { 
    const { usuario, password } = req.body;

    const user = await findUser(usuario);

    const userLogin = await Usuario.findOne({
      where: { usuarioid: user?.usuarioid },
    });

    if (!user) return res.status(404).send("Usuario no encontrado");
    else if (!user.estado)
      return res.status(403).send("Usuario le quitaron el acceso al sistema");
    else if (user.intentos >= 3)
      return res
        .status(403)
        .send("Usuario bloqueado por demasiados intentos de inicio de sesión");

    const passworHash = user.contrasena;
    const isVerified = await verifyPassword(password, passworHash);

    if (!isVerified) {
      user.intentos += 1;
      await user.save();
      return res.status(403).send("Contraseña incorrecta");
    }

    const activeSession = await Sesion.findOne({
      where: { usuario: user, fecha_cierre: IsNull() },
    });
    if (activeSession) {
      return res
        .status(403)
        .send("Ya existe una sesión activa para este usuario");
    }

    await createSession(user);

    res.send(userLogin);
  } catch (error) {
    if (error instanceof Error) {
      httpError(res, error.message);
    }
  }
};

const registerCtrl = async (req: Request, res: Response) => {
  const {
    contrasena,
    rolId,
    nombres,
    username,
    apellidos,
    identificacion,
    fecha_nacimiento,
  } = req.body;

  const correo = await generarCorreoUnico(nombres, apellidos);

  const userByUsername = await Usuario.findOne({
    where: { username: username },
  });
  if (userByUsername)
    return res.status(409).send("Nombre de usuario ya registrado");

  const rol = await Rol.findOne({ where: { rolid: rolId } });
  if (!rol) return res.status(404).send("Rol no encontrado");

  const person = await Persona.findOne({
    where: { identificacion: identificacion },
  });
  if (person) return res.status(409).send("Identificacion persona ya existe");

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
  res.status(201).json(newUser);
};

const logoutCtrl = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(id);
    const user = await Usuario.findOne({ where: { usuarioid: Number(id) } });
    if (!user) return res.status(404).send("Usuario no encontrado");

    const activeSession = await Sesion.findOne({
      where: { usuario: user, fecha_cierre: IsNull() },
    });
    if (!activeSession)
      return res.status(404).send("No hay sesiones activas para este usuario");

    activeSession.fecha_cierre = new Date();
    await activeSession.save();

    res.status(200).send("Sesión cerrada correctamente");
  } catch (error) {
    if (error instanceof Error) {
      httpError(res, error.message);
    }
  }
};



const verficarEmailCtrl = async (req: Request, res: Response) => {
  try {
    const { correo } = req.body;
    if (!correo) return res.status(400).send("Correo requerido");
    const user = await Usuario.findOne({ where: { correo: correo } });
    if (!user) return res.status(404).send("Usuario no encontrado");

    const codigo = Math.floor(100000 + Math.random() * 900000).toString();
    user.codigo = codigo;
    await user.save();

    try {
      await sendEmail(
        user.correo,
        "Recuperar contraseña",
        `Su codigo de verificación es: ${codigo}`
      );
      res.send("Email enviado");
    } catch (error) {
      res.status(500).send("Error al enviar email");
    }
  } catch (error) {
    if (error instanceof Error) {
      httpError(res, error.message);
    }
  }
};
const recuperarContrasenaCtrl = async (req: Request, res: Response) => {
  try {
    const { correo, codigo } = req.body;
    if (!correo || !codigo)
      return res.status(400).send("Correo y código requeridos");

    const user = await Usuario.findOne({ where: { correo: correo } });
    if (!user) return res.status(404).send("Usuario no encontrado");
    if (user.codigo !== codigo)
      return res.status(403).send("Código incorrecto");

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
      res.send("Email enviado");
    } catch (error) {
      res.status(500).send("Error al enviar email");
    }
  } catch (error) {
    if (error instanceof Error) {
      httpError(res, error.message);
    }
  }
};

export {
  loginCtrl,
  registerCtrl,
  logoutCtrl,
  verficarEmailCtrl,
  recuperarContrasenaCtrl,
};
