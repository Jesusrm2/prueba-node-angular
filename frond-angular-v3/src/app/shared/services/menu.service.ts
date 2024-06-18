import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Subject, catchError, map } from 'rxjs';
import { Usuario } from '../../auth/interfaces/usuario';
import { MenuChangeEvent } from '../api/menuchangeevent';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private menuSource = new Subject<MenuChangeEvent>();
  private resetSource = new Subject();

  constructor(private http: HttpClient) { }

  menuSource$ = this.menuSource.asObservable();
  resetSource$ = this.resetSource.asObservable();

  onMenuStateChange(event: MenuChangeEvent) {
      this.menuSource.next(event);
  }

  reset() {
      this.resetSource.next(true);
  }

  getUsuario() {
    const id: number = Number(sessionStorage.getItem('id'));

    
    return this.http.get<Usuario>(`${environment.urlApi}usuario/${id}`).pipe(
      map(res => res),
      catchError(err => { throw err; })
    );
  }
}
