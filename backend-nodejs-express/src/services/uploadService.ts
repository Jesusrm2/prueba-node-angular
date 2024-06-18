
import { createUser } from "../utils/createUser.handle";
import { validateUserExcel } from "../validators/excel";

const uploadService = async (data: any) => {
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
      if (usuario && "error" in usuario) {
        errores.push(usuario);
      } else {
        usuariosExitosos.push(usuario);
      }
    }
  }

  return {
    message: "Proceso completado",
    usuariosExitosos,
    errores,
  };
};

export { uploadService };
