
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router,RouterLink} from '@angular/router';
import { Auth } from '../auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email = '';
  password = '';
  mensaje = '';
  cargando = false;

  private auth = inject(Auth);
  private router = inject(Router);
async iniciarSesion(): Promise<void> {
  this.mensaje = '';
  this.cargando = true;

  try {
    await this.auth.login(this.email.trim(), this.password);
    await this.router.navigate(['/tareas']);
  } catch (error: any) {
    console.error('Error al iniciar sesión:', error);

    if (error.code === 'auth/invalid-credential') {
      this.mensaje = 'Correo o contraseña incorrectos';
    } else if (error.code === 'auth/invalid-email') {
      this.mensaje = 'El correo no es válido';
    } else if (error.code === 'auth/too-many-requests') {
      this.mensaje = 'Demasiados intentos. Espera un momento.';
    } else {
      this.mensaje = `No se pudo iniciar sesión: ${error.code ?? 'error desconocido'}`;
    }
  } finally {
    this.cargando = false;
  }
}

}
