import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AutenticacionService } from '../../servicios/autenticacion';

@Component({
  selector: 'app-registro',
  imports: [FormsModule, RouterLink],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro {
  correo = '';
  clave = '';
  mensaje = '';
  cargando = false;

  constructor(
    private autenticacion: AutenticacionService,
    private router: Router
  ) {}

  async registrar(): Promise<void> {
    this.mensaje = '';

    if (this.clave.length < 6) {
      this.mensaje =
        'La contraseña debe tener al menos 6 caracteres.';
      return;
    }

    this.cargando = true;

    try {
      await this.autenticacion.registrar(
        this.correo,
        this.clave
      );

      await this.router.navigateByUrl('/explorador');
    } catch (error) {
      const codigo = (error as { code?: string }).code;

      if (codigo === 'auth/email-already-in-use') {
        this.mensaje = 'Ese correo ya está registrado.';
      } else if (codigo === 'auth/invalid-email') {
        this.mensaje = 'El correo electrónico no es válido.';
      } else {
        this.mensaje =
          'No se pudo crear la cuenta. Revisa los datos e inténtalo nuevamente.';
      }
    } finally {
      this.cargando = false;
    }
  }
}