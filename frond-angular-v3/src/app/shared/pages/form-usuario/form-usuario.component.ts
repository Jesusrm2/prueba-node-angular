import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UsuarioService } from '../../../usuario/services/usuario.service';
import { IUsuarioRegister, Usuario } from '../../../auth/interfaces/usuario';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
})

export class FormUsuarioComponent {
  isLoading = false;
  rolesSelect = [
    { id: 1, name: 'Administrador' },
    { id: 2, name: 'Usuario' },
  ];
  registerForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
    private usuarioService: UsuarioService
  ) {
    this.registerForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
          Validators.pattern(/^(?=.*[0-9])(?=.*[A-Z]).{8,20}$/),
        ],
      ],
      identificacion: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        
        ],
      ],
      fecha_nacimiento: ['', Validators.required],
      rolId: ['', Validators.required],
      contrasena: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*()_+]).{8,}$/),
        ],
      ],
    });
    
    if (this.selectUser) {
      let fechaNacimiento = new Date(this.selectUser.persona.fecha_nacimiento).toISOString().substring(0, 10);

    
      this.registerForm.patchValue({
        nombres: this.selectUser.persona.nombres,
        apellidos: this.selectUser.persona.apellidos,
        username: this.selectUser.username,
        identificacion: this.selectUser.persona.identificacion,
        fecha_nacimiento: fechaNacimiento,
        rolId: this.selectUser.rol.rolid,
      });
    }
    if (this.authService.currentUserLoginOn.value === false) {
      this.registerForm.patchValue({
        rolId: 2,
      });
    }
  }
  get usuarioOwner(): Usuario | undefined {
    return this.authService.currentUser;
  }

  get selectUser(): Usuario | undefined {
    return this.usuarioService.currentSelectUser;
  }

  get nombres() {
    return this.registerForm.controls['nombres'];
  }

  get apellidos() {
    return this.registerForm.controls['apellidos'];
  }

  get username() {
    return this.registerForm.controls['username'];
  }

  get identificacion() {
    return this.registerForm.controls['identificacion'];
  }

  get fecha_nacimiento() {
    return this.registerForm.controls['fecha_nacimiento'];
  }

  get contrasena() {
    return this.registerForm.controls['contrasena'];
  }

  get rolId() {
    return this.registerForm.controls['rolId'];
  }

  onSubmit() {
    if (this.selectUser) {
      this.isLoading = true;
      this.usuarioService
        .updateUsuario(
          this.selectUser.usuarioid,
          this.registerForm.value as IUsuarioRegister
        )
        .subscribe({
          next: () => {
            this.isLoading = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Actualización Exitosa',
              detail: 'Usuario actualizado correctamente',
            });
            this.usuarioService.resetSelectUser();
            this.router.navigate(['/admin-usuarios']);
          },
          error: (error) => {
            this.isLoading = false;
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: error.error || error.errors,
            });
          },
        });
    } else {
      if (!this.usuarioOwner) {
        this.registerForm.patchValue({
          rolId: 2,
        });
      }
      this.isLoading = true;
      this.usuarioService
        .registerUsuario(this.registerForm.value as IUsuarioRegister)
        .subscribe({
          next: () => {
            this.isLoading = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Registro Exitoso',
              detail: 'Usuario registrado correctamente',
            });
            if (this.authService.currentUserLoginOn.value === false) {
              this.router.navigate(['/auth/login']);
            } else {
              this.router.navigate(['/admin-usuarios']);
            }
            this.usuarioService.resetSelectUser();
          },
          error: (error) => {
            this.isLoading = false;
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: error.error || error.errors,
            });
          },
        });
    }
  }

  cancel() {
    if (this.authService.currentUserLoginOn.value === false) {
      this.router.navigate(['/auth/login']);
    } else {
      this.router.navigate(['/admin-usuarios']);
    }
    this.usuarioService.resetSelectUser();
  }
}
