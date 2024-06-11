import { Usuario } from "../../auth/interfaces/usuario";

export interface IImportFile {
  message: string;
  usuariosExitosos?: Usuario[];
  errores?: IErroresExcel[];
}

export interface IErroresExcel {
  ubicacion: string;
  error: string;
}