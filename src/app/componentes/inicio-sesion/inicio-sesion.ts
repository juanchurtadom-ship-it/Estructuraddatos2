import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AutenticacionService } from '../../servicios/autenticacion';

@Component({
  selector: 'app-inicio-sesion',
  imports: [FormsModule, RouterLink],
  templateUrl: './inicio-sesion.html',
  styleUrl: './inicio-sesion.css'
})
export class InicioSesion {
  correo = '';
  clave = '';
  mensaje = '';
  cargando = false;

  constructor(
    private autenticacion: AutenticacionService,
    private router: Router
  ) {}

  async iniciarSesion(): Promise<void> {
    this.mensaje = '';
    this.cargando = true;

    try {
      await this.autenticacion.iniciarSesion(
        this.correo,
        this.clave
      );

      await this.router.navigateByUrl('/explorador');
    } catch (error) {
      const codigo = (error as { code?: string }).code;

      if (
        codigo === 'auth/invalid-credential' ||
        codigo === 'auth/user-not-found' ||
        codigo === 'auth/wrong-password'
      ) {
        this.mensaje = 'Correo o contraseña incorrectos.';
      } else {
        this.mensaje =
          'No se pudo iniciar sesión. Revisa los datos e inténtalo nuevamente.';
      }
    } finally {
      this.cargando = false;
    }
  }
}