import { Component } from '@angular/core';
import { Usuario } from '../../../auth/interfaces/usuario';
import { AuthService } from '../../../auth/services/auth.service';
import { UsuarioService } from '../../services/usuario.service';
import { IUserWelcome } from '../../interfaces/user';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html'
})
export class HomePageComponent {
  isLoading = false;
  userWelcome?: IUserWelcome;
  constructor(
    private usuarioService: UsuarioService,
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
        error: () => {
          this.isLoading = false
        },
        complete: () => this.isLoading = false,
      }
    );
  }
}
