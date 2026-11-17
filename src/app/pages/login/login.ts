import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  private auth = inject(AuthService);
  private router = inject(Router);

  email = '';
  clave = '';
  mensaje = '';

  async entrar() {
    const { error } = await this.auth.entrar(
      this.email,
      this.clave
    );

    if (error) {
      this.mensaje = error.message;
    } else {
      await this.router.navigate(['/tareas']);
    }
  }

  async registrar() {
    const { data, error } = await this.auth.registrar(
      this.email,
      this.clave
    );

    if (error) {
      this.mensaje = error.message;
    } else if (data.session) {
      await this.router.navigate(['/tareas']);
    } else {
      this.mensaje = 'Cuenta creada. Revisa tu correo para confirmar el registro.';
    }
  }
}