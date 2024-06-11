


export interface UsuarioLoginResponse {
  token: string;
  user: Usuario;
}

export interface Usuario {
  usuarioid: number;
  username: string;
  correo: string;
  contrasena: string;
  estado: boolean;
  codigo: null;
  intentos: null;
  rol: Rol;
  persona: Persona;
}

interface Persona {
  personaid: number;
  nombres: string;
  apellidos: string;
  identificacion: string;
  fecha_nacimiento: string;
}

interface Rol {
  rolid: number;
  rolname: string;
}


export interface UserLogin {
    usuario: string;
    password: string;
}



export interface IUsuarioRegister  {
  contrasena: string;
  rolId: number;
  nombres: string;
  username: string;
  apellidos: string;
  identificacion: string;
  fecha_nacimiento: string;
}

export interface IForgotPassword {
  correo: string;
  codigo: string;
}

export interface VerifyEmail {
  correo: string;
}
