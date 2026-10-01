import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email = '';
  password = '';

  mensaje = '';

  private auth = inject(Auth);
  private router = inject(Router);

  iniciarSesion(): void {

    const correcto = this.auth.login(this.email, this.password);

    if (correcto) {
      this.mensaje = '';
      this.router.navigate(['/ejercicio1']);
    } else {
      this.mensaje = 'Correo o contraseña incorrectos';
    }
  }
}