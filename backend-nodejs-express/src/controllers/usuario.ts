import { httpError } from "../utils/error.handle";
import { Rol } from "../models/rol";
import { Usuario } from "../models/usuario";
import { Request, Response } from "express";
import { Persona } from "../models/persona";
import { encrypt } from "../utils/bcrypt.handle";
import { Sesion } from "../models/sesion";
import { IsNull, Not } from "typeorm";
import { generarCorreoUnico } from "../helpers/usuario.helper";

const getUsuarioByIdCrtl = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    const user = await Usuario.findOneBy({ usuarioid: Number(id) });
    if (!user) {
      res.status(404).send("Usuario no encontrado");
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    if (error instanceof Error) {
      httpError(res, error.message);
    }
  }
};

const getAllUsuariosCrtl = async (req: Request, res: Response) => {
  try {
    const users = await Usuario.find({ where: { estado: true } });

    if (!users) {
      res.status(404).send("Usuarios no encontrados");
    } else {
      res.status(200).json(users);
    }
  } catch (error) {
    if (error instanceof Error) {
      httpError(res, error.message);
    }
  }
};

const updateUsuarioCrtl = async ({ params, body }: Request, res: Response) => {
  try {
    const { id } = params;
    const {
      contrasena,
      rolId,
      nombres,
      username,
      apellidos,
      identificacion,
      fecha_nacimiento,
    } = body;
    const user = await Usuario.findOneBy({ usuarioid: Number(id) });
    if (!user) {
      res.status(404).send("Usuario no encontrado");
    } else {
      const correo = await generarCorreoUnico(nombres, apellidos);
      const rol = await Rol.findOne({ where: { rolid: rolId } });
      if (rol) {
        const passHash = await encrypt(contrasena);
        user.persona.nombres = nombres;
        user.persona.apellidos = apellidos;
        user.persona.identificacion = identificacion;
        user.persona.fecha_nacimiento = fecha_nacimiento;
        await user.persona.save();

        user.username = username;
        user.correo = correo;
        user.contrasena = passHash;
        user.rol = rol;
        await user.save();
        res.status(200).json(user);
      } else {
        res.status(404).send("Rol no encontrado");
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      httpError(res, error.message);
    }
  }
};

const deleteUsuarioCrtl = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    const user = await Usuario.findOneBy({ usuarioid: Number(id) });
    if (!user) {
      res.status(404).send("Usuario no encontrado");
    } else {
      user.estado = false;
      await user.save();
      res.status(204).send();
    }
  } catch (error) {
    if (error instanceof Error) {
      httpError(res, error.message);
    }
  }
};

const welcomeCtrl = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await Usuario.findOne({ where: { usuarioid: Number(id) } });
    if (!user) return res.status(404).send("Usuario no encontrado");

    const lastSession = await Sesion.createQueryBuilder("sesion")
      .where("sesion.usuarioId = :id", { id: user.usuarioid })
      .andWhere("sesion.fecha_cierre IS NOT NULL")
      .orderBy("sesion.fecha_cierre", "DESC")
      .getOne();

    if (!lastSession)
      return res
        .status(404)
        .send("No hay sesiones anteriores para este usuario");

    const data = {
      user: user,
      lastSession: lastSession,
    };

    res.status(200).send(data);
  } catch (error) {
    if (error instanceof Error) {
      httpError(res, error.message);
    }
  }
};

const dashboardCtrl = async (req: Request, res: Response) => {
  try {
    const users = await Usuario.find();
    const usersWithSessions = [];

    for (const user of users) {
      const activeSessions = await Sesion.createQueryBuilder("sesion")
        .select([
          "sesion.sesionid",
          "sesion.fecha_ingreso",
          "sesion.fecha_cierre",
        ])
        .where("sesion.usuarioId = :id", { id: user.usuarioid })
        .andWhere("sesion.fecha_cierre IS NULL")
        .getMany();

      const inactiveSessions = await Sesion.createQueryBuilder("sesion")
        .select([
          "sesion.sesionid",
          "sesion.fecha_ingreso",
          "sesion.fecha_cierre",
        ])
        .where("sesion.usuarioId = :id", { id: user.usuarioid })
        .andWhere("sesion.fecha_cierre IS NOT NULL")
        .getMany();

      usersWithSessions.push({
        user: user,
        activeSessions: activeSessions,
        inactiveSessions: inactiveSessions,
      });
    }

    res.status(200).send(usersWithSessions);
  } catch (error) {
    if (error instanceof Error) {
      httpError(res, error.message);
    }
  }
};

const executeProcedure = async (req: Request, res: Response) => {
  try {
    const result = await Usuario.query(`CALL crear_roles_y_admin()`);
    res.status(200).send(result);
  } catch (error) {
    if (error instanceof Error) {
      httpError(res, error.message);
    }
  }
};

export {
  getUsuarioByIdCrtl,
  getAllUsuariosCrtl,
  updateUsuarioCrtl,
  deleteUsuarioCrtl,
  welcomeCtrl,
  dashboardCtrl,
  executeProcedure,
};
