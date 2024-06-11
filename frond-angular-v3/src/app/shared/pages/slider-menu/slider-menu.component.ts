import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { Usuario } from '../../../auth/interfaces/usuario';
import { LayoutService } from '../../services/app.layout.service';
import { MenuService } from '../../services/menu.service';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-slider-menu',
    templateUrl: './slider-menu.component.html'
})
export class SliderMenuComponent {
    model: MenuItem[] = [];
    usuario?: Usuario;
    userLoginOn: boolean = false;
    constructor(   private authService: AuthService,public layoutService: LayoutService, private menuService: MenuService, private router: Router,) {
    }

    ngOnInit() {

            this.menuService.getUsuario().subscribe(
                {
                    next: (usuario: Usuario) => {
                        this.usuario = usuario;
                        this.model = this.generarMenuItems();
                    },
                    error: (err) => {
                        console.log(err);
                    }
                }
            );
        
       
    }
    generarMenuItems(): MenuItem[] {
        let items: MenuItem[] = [
            { label: 'Home', icon: 'pi pi-home', command: () => this.navegar('/home') }
        ];

        if (this.usuario) {
            switch (this.usuario.rol.rolid) {
                case 1:
                    items.push(
                        { label: 'Dashboard', icon: 'pi pi-chart-bar', command: () => this.navegar('/dashboard') },
                        { label: 'Administrar usuarios', icon: 'pi pi-user-plus', command: () => this.navegar('/admin-usuarios') }
                    );
                    break;
                case 2:
                    items.push(
                        { label: 'Opciones usuario 1', icon: 'pi pi-calendar-plus', command: () => this.navegar('/asignar-turnos') },
                        { label: 'Opciones usuario 2', icon: 'pi pi-cart-plus', command: () => this.navegar('/asignar-caja') },
                        { label: 'Opciones usuario 3', icon: 'pi pi-user-plus', command: () => this.navegar('/form-usuario') }
                    );
                    break;

            }
        }

        return [
            {
                label: 'OPCIONES',
                items: items
            }
        ];
    }
    navegar(ruta: string) {
        this.router.navigate([ruta]);
    }
}

