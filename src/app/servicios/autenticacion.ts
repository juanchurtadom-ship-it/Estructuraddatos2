
import { Injectable, signal } from '@angular/core';

import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

import { auth } from '../firebase/config';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  readonly usuario = signal<User | null>(auth.currentUser);

  constructor() {
    onAuthStateChanged(auth, (usuario) => {
      this.usuario.set(usuario);
    });
  }

  registrar(correo: string, clave: string) {
    return createUserWithEmailAndPassword(
      auth,
      correo.trim(),
      clave
    );

  }
  obtenerUidActual(): string | null {
  return auth.currentUser?.uid ?? null;
}
  obtenerCorreoActual(): string | null {
  return auth.currentUser?.email ?? null;
}

  iniciarSesion(correo: string, clave: string) {
    return signInWithEmailAndPassword(
      auth,
      correo.trim(),
      clave
    );
  }

  cerrarSesion() {
    return signOut(auth);
  }
}
