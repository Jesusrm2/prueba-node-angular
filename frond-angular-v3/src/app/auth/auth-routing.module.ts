import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'login', component: LoginPageComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)], 
})
export class AuthRoutingModule { }