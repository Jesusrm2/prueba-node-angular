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
  currentUserData: BehaviorSubject<String> =new BehaviorSubject<String>("");

  private usuario?: Usuario;
  constructor(private http: HttpClient, private router: Router) {
    this.currentUserLoginOn=new BehaviorSubject<boolean>(sessionStorage.getItem("token")!=null);
    this.currentUserData=new BehaviorSubject<String>(sessionStorage.getItem("token") || "");
  }
  get currentUser():Usuario|undefined {
    if ( !this.usuario ) return undefined;
    return structuredClone( this.usuario );
  }
  loginUser(userDetails: UserLogin) {
    return this.http
      .post<UsuarioLoginResponse>(
        `${environment.urlHost}auth/login`,
        userDetails
      )
      .pipe(
        tap(() => this.currentUserLoginOn.next(true)),
        tap( data => {
          sessionStorage.setItem("token", data.token);
          this.usuario = data.user;
          sessionStorage.setItem("id",  this.usuario.usuarioid.toString());
          this.currentUserData.next(data.token);
          this.currentUserLoginOn.next(true);
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
  get userData():Observable<String>{
    return this.currentUserData.asObservable();
  }

  get userLoginOn(): Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
  }

  get userToken():String{
    return this.currentUserData.value;
  }
  get Usuario():Observable<String>{
    return this.currentUserData.asObservable();
  }
}
