import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { IDashboard } from '../../interfaces/user';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  isLoading = false;
  listUsuariosSesion: IDashboard[] = [];
  allUsers: IDashboard[] = [];
  selectUsuario?: IDashboard;

  searchTerm = new Subject<string>();

  showDialogVisible = false;

  constructor(
    private usuarioService: UsuarioService,
    private msgService: MessageService
  ) {}

  ngOnInit() {
    this.loadUsuarios();
    this.searchTerm.pipe(
      debounceTime(300)
    ).subscribe(search => this.filter(search));
  
  }

  loadUsuarios() {
    this.isLoading = true;
    this.usuarioService.getUsuarioSesiones().subscribe(
      {
        next: (usuarios) => {
          this.listUsuariosSesion = usuarios;
        },
        error: (error) => {
          this.msgService.add({ severity: 'error', summary: 'Error', detail: `${error.error}` })
          this.isLoading = false
        },
        complete: () => this.isLoading = false,
      }
    );
  }
  showDialog(usuario: IDashboard) {
    this.selectUsuario = usuario;
    this.showDialogVisible = true;
  }
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm.next(input.value);
  }

  filter(search: string) {
    if (!search) {
      this.listUsuariosSesion = [...this.allUsers];
    } else {
      this.listUsuariosSesion = this.allUsers.filter(evento => evento.user.username.includes(search));
    }
  }

}