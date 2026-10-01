import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../auth';

@Component({
  selector: 'app-ejercicio2',
  imports: [RouterLink],
  templateUrl: './ejercicio2.html',
  styleUrl: './ejercicio2.css'
})
export class Ejercicio2 {

  private auth = inject(Auth);
  private router = inject(Router);

  usuario = this.auth.usuario;

  cerrarSesion(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}