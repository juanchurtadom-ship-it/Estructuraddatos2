import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../auth';

@Component({
  selector: 'app-ejercicio1',
  imports: [RouterLink],
  templateUrl: './ejercicio1.html',
  styleUrl: './ejercicio1.css'
})
export class Ejercicio1 {

  private auth = inject(Auth);
  private router = inject(Router);

  usuario = this.auth.usuario;

  cerrarSesion(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}