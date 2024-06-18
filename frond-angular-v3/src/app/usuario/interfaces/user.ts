import { Usuario } from "../../auth/interfaces/usuario";

export interface IUserWelcome {
  user: Usuario;
  lastSession: LastSession;
}

interface LastSession {
  sesionid: number;
  fecha_ingreso: string;
  fecha_cierre: string;
}


export interface IDashboard {
  user: Usuario;
  activeSessions: ActiveSession[];
  inactiveSessions: InactiveSession[];
}

interface InactiveSession {
  sesionid: number;
  fecha_ingreso: string;
  fecha_cierre: string;
}

interface ActiveSession {
  sesionid: number;
  fecha_ingreso: string;
  fecha_cierre: null;
}



