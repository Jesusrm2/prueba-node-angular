import { Response } from "express";
import { Usuario } from "../models/usuario";

const verifyUserStatus = (user: Usuario, res: Response) => {
    if (!user) return res.status(404).send("Usuario no encontrado");
    else if (!user.estado)
      return res.status(403).send("Usuario le quitaron el acceso al sistema");
    else if (user.intentos >= 3)
      return res
        .status(403)
        .send("Usuario bloqueado por demasiados intentos de inicio de sesión");
    return user;
  };

export { verifyUserStatus };