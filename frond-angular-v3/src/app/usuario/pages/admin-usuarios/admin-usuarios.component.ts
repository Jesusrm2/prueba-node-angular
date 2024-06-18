import { Component } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';
import { Usuario } from '../../../auth/interfaces/usuario';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-admin-usuarios',
  templateUrl: './admin-usuarios.component.html'
})
export class AdminUsuariosComponent {

  listUsers: Usuario[] = [];
  allUsers: Usuario[] = [];
  isLoading = false;
  searchTerm = new Subject<string>();
  roles = [{ id: 1, name: 'Administrador' },{ id: 2, name: 'Usuario' },];
  constructor(
    private usuarioService: UsuarioService,
    private msgService: MessageService,
    private router: Router,
  ) {}
  ngOnInit() {
    this.loadUsuarios();
    this.searchTerm.pipe(
      debounceTime(300)
    ).subscribe(search => this.filter(search));
  }


  formUser(user?: Usuario) {
    if (!user) {
      this.router.navigate(['/formulario-usuarios']);
    } else {
      this.usuarioService.setSelectUser(user);
      this.router.navigate(['/formulario-usuarios']);
    }

  }
  loadUsuarios() {
    this.isLoading = true;
    this.usuarioService.getUsuarios().subscribe(
      {
        next: (usuarios) => {
          this.listUsers = usuarios;
          this.allUsers = usuarios;
        },
        error: (error) => {
          this.msgService.add({ severity: 'error', summary: 'Error', detail: `${error.error}` })
          this.isLoading = false
        },
        complete: () => this.isLoading = false,
      }
    );
  }

  deleteUser(user: Usuario) {
    this.isLoading = true;
    this.usuarioService.deleteUsuario(user.usuarioid).subscribe({
      next: () => {
        this.msgService.add({ severity: 'success', summary: 'Éxito', detail: 'Usuario eliminado correctamente' });
      },
      error: (error) => {

        this.isLoading = false;
        this.msgService.add({ severity: 'error', summary: 'Error', detail: `${error.error}` });
        this.loadUsuarios();
      },
      complete: () => {
        this.loadUsuarios();
        this.isLoading = false;
      }
    });
  }
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm.next(input.value);
  }

  filter(search: string) {
    if (!search) {
      this.listUsers = [...this.allUsers];
    } else {
      this.listUsers = this.allUsers.filter(evento => evento.username.includes(search));
    }
  }
}
