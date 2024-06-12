import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { IUserWelcome } from '../../interfaces/user';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html'
})
export class HomePageComponent {
  isLoading = false;
  userWelcome?: IUserWelcome;
  constructor(
    private usuarioService: UsuarioService,
    private messageService: MessageService,
  ) {}
  ngOnInit(){
    this.loadUserWelcome();
  }


  loadUserWelcome() {
    this.isLoading = true;
    let id = Number(sessionStorage.getItem('id'));
    this.usuarioService.getUsuarioWelcome(id).subscribe(
      {
        next: (user) => {
          this.userWelcome = user;
        },
        error: (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `${error.error}` })
          this.isLoading = false
        },
        complete: () => this.isLoading = false,
      }
    );
  }
}
