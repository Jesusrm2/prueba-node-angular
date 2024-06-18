import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { ReactiveFormsModule, Form } from '@angular/forms';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';


import { UsuarioRoutingModule } from './usuario-routing.module';
import { SharedModule } from '../shared/shared.module';

import { AuthModule } from '../auth/auth.module';
import { FormsModule } from '@angular/forms';
import { AdminUsuariosComponent } from './pages/admin-usuarios/admin-usuarios.component';
import { FormularioUsuarioComponent } from './components/formulario-usuario/formulario-usuario.component';
import { ImportFileComponent } from './components/import-file/import-file.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';


@NgModule({
  declarations: [
    LayoutPageComponent,
    HomePageComponent,
    AdminUsuariosComponent,
    FormularioUsuarioComponent,
    ImportFileComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    UsuarioRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    AuthModule,
    FormsModule
  ]


})
export class UsuarioModule { }
