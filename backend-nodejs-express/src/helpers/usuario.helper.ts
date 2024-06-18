import { Sesion } from "../models/sesion";
import { Usuario } from "../models/usuario";
import { verified } from "../utils/bcrypt.handle";

const findUser = async (usuario: string) => {
  return await Usuario.createQueryBuilder("usuario")
    .where("usuario.correo = :usuario OR usuario.username = :usuario", {
      usuario,
    })
    .getOne();
};

const verifyPassword = async (password: string, passworHash: string) => {
  return await verified(password, passworHash);
};

const createSession = async (user: Usuario) => {
  const newSession = Sesion.create({
    fecha_ingreso: new Date(),
    usuario: user,
  });
  await newSession.save();
};

async function generarCorreoUnico(nombres: string, apellidos: string) {
    let baseCorreo = `${nombres[0]}${apellidos.split(" ")[0]}@mail.com`.toLowerCase();
    let correo = baseCorreo;
    let userByEmail = await Usuario.findOne({ where: { correo: correo } });
  
    let i = 1;
    while (userByEmail) {
      correo = `${baseCorreo.split('@')[0]}${i}@mail.com`;
      userByEmail = await Usuario.findOne({ where: { correo: correo } });
      i++;
    }
  
    return correo;
  }
 
export { findUser, verifyPassword, createSession, generarCorreoUnico };