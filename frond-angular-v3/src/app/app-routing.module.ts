import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule ),

  },
  {
    path: '',
    loadChildren: () => import('./usuario/usuario.module').then( m => m.UsuarioModule ),
    canActivate: [AuthGuard]

  },
  {
    path: '',
    redirectTo: "auth/login",
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
