import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserLogin } from '../../interfaces/usuario';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  isLoading = false;
  loginForm = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', Validators.required]
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private msgService: MessageService
  ) { }

  get email() {
    return this.loginForm.controls['email'];
  }
  get password() { return this.loginForm.controls['password']; }

  loginUser() {
    this.isLoading = true;
    let { email, password } = this.loginForm.value;
    const userLogin: UserLogin = { usuario: email!, password: password! };
    this.authService.loginUser(userLogin).subscribe(
      {
        error: error => {
          this.msgService.add({ severity: 'error', summary: 'Error', detail: `${error.error}`});
          this.isLoading = false;
        },
        complete: () => {
          this.msgService.add({ severity: 'success', summary: 'Success', detail: 'Login successful'});
          this.router.navigate(['/home']);
          this.loginForm.reset();
          this.isLoading = false;
        }
      }
    );
  }
}
