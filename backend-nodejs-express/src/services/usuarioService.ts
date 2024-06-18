
import { Usuario } from "../models/usuario";
import { generarCorreoUnico } from "../helpers/usuario.helper";
import { Rol } from "../models/rol";
import { encrypt } from "../utils/bcrypt.handle";
import { Sesion } from "../models/sesion";

const getByOneUsuario = async (id: string) => {
  const user = await Usuario.findOneBy({ usuarioid: Number(id) });
  if (!user) return { status: 404, message: "Usuario no encontrado" };
  else return { status: 200, data: user };
};

const getAllUsuarios = async () => {
  const users = await Usuario.find({ where: { estado: true } });
  if (!users) return { status: 404, message: "Usuarios no encontrados" };
  else return { status: 200, data: users };
};

const updateUsuario = async (id: string, body: any) => {
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
  if (!user) return  { status: 404, message: "Usuario no encontrado" };

  const correo = await generarCorreoUnico(nombres, apellidos);
  const rol = await Rol.findOne({ where: { rolid: rolId } });
  if (!rol) return { status: 404, message: "Rol no encontrado" };
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
  return { status: 200, data: user}
};

const deleteUsuario = async (id: string) => {
    const user = await Usuario.findOneBy({ usuarioid: Number(id) });
    if (!user) return  { status: 404, message: "Usuario no encontrado" };
    else {
      user.estado = false;
      await user.save();
      return { status: 200, message: "Usuario eliminado" };
    }
}

const welcome = async (id: string) => {
  const user = await Usuario.findOne({ where: { usuarioid: Number(id) } });
    if (!user) return { status: 404, message: "Usuario no encontrado" };

    const lastSession = await Sesion.createQueryBuilder("sesion")
      .where("sesion.usuarioId = :id", { id: user.usuarioid })
      .andWhere("sesion.fecha_cierre IS NOT NULL")
      .orderBy("sesion.fecha_cierre", "DESC")
      .getOne();

    if (!lastSession)
      return { status: 404, message: "No se encontraron sesiones" };

    const data = {
      user: user,
      lastSession: lastSession,
    };

    return { status: 200, data: data };
}

const dashboard = async () => {
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
    if (!usersWithSessions) return { status: 404, message: "No se encontraron usuarios" };
  
    return { status: 200, data: usersWithSessions };
}

export { getByOneUsuario, getAllUsuarios, updateUsuario, deleteUsuario, welcome, dashboard };
