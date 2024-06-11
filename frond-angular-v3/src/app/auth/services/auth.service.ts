import { Injectable } from '@angular/core';
import {
  IForgotPassword,
  UserLogin,
  Usuario,
  UsuarioLoginResponse,
  VerifyEmail,
} from '../interfaces/usuario';
import { environment } from '../../../environments/environment';
import { catchError, BehaviorSubject, tap, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  private usuario?: Usuario;
  constructor(private http: HttpClient, private router: Router) {
    this.currentUserLoginOn=new BehaviorSubject<boolean>(sessionStorage.getItem("user")!=null);
  }
  get currentUser():Usuario|undefined {
    if ( !this.usuario ) return undefined;
    return structuredClone( this.usuario );
  }
  loginUser(userDetails: UserLogin) {
    return this.http
      .post<Usuario>(
        `${environment.urlHost}auth/login`,
        userDetails
      )
      .pipe(
        tap(() => this.currentUserLoginOn.next(true)),
        tap( usuario => {
          this.usuario = usuario
          sessionStorage.setItem("id",  this.usuario.usuarioid.toString())
        }),
        map((response) => response),
        catchError((error) => {
          throw error;
        })
      );
  }

  logout() {
    const id = Number(sessionStorage.getItem('id'));
    return this.http
      .post(
        `${environment.urlHost}auth/logout/${id}`,
        {},
        { responseType: 'text' }
      )
      .pipe(
        tap(() => {
          this.currentUserLoginOn.next(false);
          this.usuario = undefined;
          sessionStorage.clear();
          this.router.navigate(['/auth/login']);
        }),
        map((response) => response),
        catchError((error) => {
          throw error;
        })
      );
  }

  forgotPasswordSendEmail(userEmail: string) {
    let data: VerifyEmail = {
      correo: userEmail,
    };

    return this.http
      .post(`${environment.urlHost}auth/verify-email`, data, {
        responseType: 'text',
      })
      .pipe(
        map((response) => response),
        catchError((error) => {
          throw error;
        })
      );
  }
  forgotPasswordVerifyCode(data: IForgotPassword) {
    return this.http
      .post(`${environment.urlHost}auth/reset-password`, data, {
        responseType: 'text',
      })
      .pipe(
        map((response) => response),
        catchError((error) => {
          throw error;
        })
      );
  }

}
