import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UsuarioService } from '../../../usuario/services/usuario.service';
import { AuthService } from '../../services/auth.service';
import { IForgotPassword } from '../../interfaces/usuario';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent {
  isLoading = false;
  formulario: FormGroup;
  formulariocodigo: FormGroup;
  emailSent = "";
  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private usuarioService: UsuarioService,
    private authservice: AuthService
  ) { 
    this.formulario = this.fb.group({
      correo: ['', [Validators.required, Validators.email]]
    });
    this.formulariocodigo = this.fb.group({
      correo: [''],
      codigo: ['', [Validators.required]]
    });
  }
  get correo() {
    return this.formulario.controls['correo'];
  }
  get codigo() {
    return this.formulariocodigo.controls['codigo'];
  }
  sendEmail() {
    this.isLoading = true;
    if (this.formulario.valid) {
      this.authservice.forgotPasswordSendEmail(this.formulario.value.correo).subscribe(
        {
          next: () => {

            this.emailSent = this.formulario.value.correo;
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Email enviado'});  
          },
          error: error => {
            console.log(error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: `${error.error}`});
            this.isLoading = false;
          },
          complete: () => {
            this.isLoading = false;
          }
        }
      );
    }
  }

  seCreoLaContrasena = false;
  sendEmailcodigo() {
    this.isLoading = true;
    this.formulariocodigo.patchValue({correo: this.emailSent});
    if (this.formulariocodigo.valid) {
      console.log(this.formulariocodigo.value);
      this.authservice.forgotPasswordVerifyCode(this.formulariocodigo.value as IForgotPassword).subscribe(
        {
          next: () => {

            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Contraseña creada'});  
            this.seCreoLaContrasena = true;
          },
          error: error => {
            console.log(error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: `${error.error}`});
            this.isLoading = false;
          },
          complete: () => {
            this.isLoading = false;
          }
        }
      );
    }
  }
  preventSpaces(event:any) {
    if (event.which === 32) {
      event.preventDefault();
    }
  }

}
