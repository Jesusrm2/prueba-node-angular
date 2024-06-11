import { Request, Response } from "express";
import { validateUserExcel } from "../validators/excel";
import { createUser } from "../utils/createUser.handle";


const uploadExcelCrtl = async (req: Request, res: Response) => {
  try {
    const data = req.body.data;
    const usuariosExitosos = [];
    const errores = [];

    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const rowErrors = await validateUserExcel(row, i);
      errores.push(...rowErrors);
    }

    if (errores.length === 0) {
      for (let i = 0; i < data.length; i++) {
        const row = data[i];
        const usuario = await createUser(row, i);
        if (usuario && 'error' in usuario) {
          errores.push(usuario);
        } else {
          usuariosExitosos.push(usuario);
        }
      }
    }

    res.status(200).json({
      message: "Proceso completado",
      usuariosExitosos,
      errores
    });
  } catch (e) {
    console.error(e);
    res.status(500).send("Error al procesar el archivo");
  }
};

export { uploadExcelCrtl };