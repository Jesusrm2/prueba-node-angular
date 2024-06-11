import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AdminUsuariosComponent } from './pages/admin-usuarios/admin-usuarios.component';
import { FormularioUsuarioComponent } from './components/formulario-usuario/formulario-usuario.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';



const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'home', component: HomePageComponent },
      { path: 'admin-usuarios', component: AdminUsuariosComponent },
      { path: 'formulario-usuarios', component: FormularioUsuarioComponent },
      { path: 'dashboard', component: DashboardComponent },
    ]
  }
   
];

@NgModule({
  imports: [RouterModule.forChild(routes)], 
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }