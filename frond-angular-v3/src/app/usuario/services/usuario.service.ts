import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IUsuarioRegister, Usuario } from '../../auth/interfaces/usuario';
import { IDashboard, IUserWelcome } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  selectUser?: Usuario;
  constructor(private http: HttpClient) { }

  get currentSelectUser(): Usuario | undefined {
    if (!this.selectUser) return undefined;
    return structuredClone(this.selectUser);
  }



  registerUsuario(userDetails: IUsuarioRegister) {
    return this.http.post<Usuario>(`${environment.urlHost}auth/register`, userDetails).pipe(
      map(response => response),
      catchError(error => { throw error })
    );
  }
  updateUsuario( id: number,userDetails: IUsuarioRegister) {
    return this.http.put<Usuario>(`${environment.urlApi}usuario/${id}`, userDetails).pipe(
      map(response => response),
      catchError(error => { throw error })
    );
  }
  getUsuarios() {
    return this.http.get<Usuario[]>(`${environment.urlApi}usuarios`).pipe(
      catchError(error => { throw error })
    );
  }

  getUsuarioWelcome(id: number) {
    return this.http.get<IUserWelcome>(`${environment.urlApi}/usuario/welcome/${id}`).pipe(
      map(response => response),
      catchError(error => { throw error })
    );
  }

  getUsuarioSesiones() {
    return this.http.get<IDashboard[]>(`${environment.urlApi}/usuarios/sesiones`).pipe(
      map(response => response),
      catchError(error => { throw error })
    );
  }

  deleteUsuario(id: number) {
    return this.http.delete(`${environment.urlApi}usuario/${id}`).pipe(
      map(response => response),
      catchError(error => { throw error })
    );
  }

  setSelectUser(user: Usuario) {
    this.selectUser = user;
  }
  resetSelectUser() {
    this.selectUser = undefined;
  }
}
