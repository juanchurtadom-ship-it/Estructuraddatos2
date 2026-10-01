import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  usuario = signal<string | null>(null);

  login(email: string, password: string): boolean {

    if (email === 'user@mail.com' && password === '123') {
      this.usuario.set(email);
      return true;
    }

    return false;
  }

  logout(): void {
    this.usuario.set(null);
  }

  estaAutenticado(): boolean {
    return this.usuario() !== null;
  }
}