
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  email = '';
  password = '';
  confirmarPassword = '';
  mensaje = '';
  cargando = false;

  private auth = inject(Auth);
  private router = inject(Router);

  async registrar(): Promise<void> {
    this.mensaje = '';

    if (this.password !== this.confirmarPassword) {
      this.mensaje = 'Las contraseñas no coinciden';
      return;
    }

    if (this.password.length < 6) {
      this.mensaje = 'La contraseña debe tener al menos 6 caracteres';
      return;
    }

    this.cargando = true;

    try {
      await this.auth.registrar(this.email, this.password);
      await this.router.navigate(['/tareas']);
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        this.mensaje = 'Este correo ya está registrado';
      } else if (error.code === 'auth/invalid-email') {
        this.mensaje = 'El correo electrónico no es válido';
      } else {
        this.mensaje = 'No se pudo crear la cuenta. Inténtalo de nuevo.';
        console.error(error);
      }
    } finally {
      this.cargando = false;
    }
  }
}
