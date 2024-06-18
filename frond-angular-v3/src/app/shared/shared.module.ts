import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { LoadingScreamComponent } from './pages/loading-scream/loading-scream.component';
import { HeaderComponent } from './pages/header/header.component';
import { SliderMenuComponent } from './pages/slider-menu/slider-menu.component';
import { UsuarioRoutingModule } from '../usuario/usuario-routing.module';

import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './pages/footer/footer.component';
import { SliderBarComponent } from './pages/slider-bar/slider-bar.component';
import { RouterModule } from '@angular/router';
import { AppMenuitemComponent } from './pages/slider-menu/app.menuitem.component';
import { FormUsuarioComponent } from './pages/form-usuario/form-usuario.component';


@NgModule({
  declarations: [
    LoadingScreamComponent,
    HeaderComponent,
    SliderMenuComponent,
    FormUsuarioComponent,
    FooterComponent,
    SliderBarComponent,
    AppMenuitemComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    UsuarioRoutingModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    LoadingScreamComponent,
    HeaderComponent,
    SliderMenuComponent,
    FooterComponent,
    SliderBarComponent,
    FormUsuarioComponent
    
  ]
})
export class SharedModule { }