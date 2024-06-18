import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { LayoutService } from '../../services/app.layout.service';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  items!: MenuItem[];

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  constructor(public layoutService: LayoutService, private authService: AuthService, private router: Router, private msg:MessageService ) { }
  onLogout() {
    this.authService.logout().subscribe(
      {
        next: () => {
          this.router.navigate(['/auth/login']);
        },
        error: (error) => {
          this.msg.add({severity:'error', summary:'Error', detail:error.error});
        }
      }
    );

  }
}
