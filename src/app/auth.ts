
import { Injectable, signal } from '@angular/core';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { auth } from './firebase/config';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  usuario = signal<User | null>(auth.currentUser);
  private autenticacionLista: Promise<void>;

  constructor() {
    this.autenticacionLista = new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        this.usuario.set(user);
        unsubscribe();
        resolve();
      });
    });
  }

  async esperarAutenticacion(): Promise<void> {
    await this.autenticacionLista;
  }

  async login(email: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async registrar(email: string, password: string): Promise<void> {
    await createUserWithEmailAndPassword(auth, email, password);
  }

  async logout(): Promise<void> {
    await signOut(auth);
  }

  estaAutenticado(): boolean {
    return this.usuario() !== null;
  }
}
