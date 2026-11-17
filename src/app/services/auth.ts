import { Injectable, inject, signal } from '@angular/core';
import { Session } from '@supabase/supabase-js';
import { SupabaseService } from './supabase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private sb = inject(SupabaseService).client;

  session = signal<Session | null>(null);

  constructor() {

    this.sb.auth.getSession().then(({ data }) => {
      this.session.set(data.session);
    });

    this.sb.auth.onAuthStateChange((_evento, sesion) => {
      this.session.set(sesion);
    });

  }

  registrar(email: string, clave: string) {
    return this.sb.auth.signUp({
      email,
      password: clave
    });
  }

  entrar(email: string, clave: string) {
    return this.sb.auth.signInWithPassword({
      email,
      password: clave
    });
  }

  salir() {
    return this.sb.auth.signOut();
  }

}