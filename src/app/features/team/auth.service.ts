import { Injectable, inject, signal } from '@angular/core';

import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from '@angular/fire/auth';

import {
  Firestore,
  doc,
  getDoc,
  setDoc,
  serverTimestamp
} from '@angular/fire/firestore';

export type UserRole =
  | 'cliente'
  | 'restaurante'
  | 'domiciliario';

export interface FoodFlowUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Servicios de Firebase
  private readonly auth = inject(Auth);
  private readonly firestore = inject(Firestore);

  // Usuario actualmente autenticado
  private readonly currentUserSignal =
    signal<FoodFlowUser | null>(null);

  readonly user = this.currentUserSignal.asReadonly();

  // Control de carga de la sesión
  private resolveReady!: () => void;
  private readyResolved = false;

  private readonly readyPromise = new Promise<void>(
    resolve => {
      this.resolveReady = resolve;
    }
  );

  constructor() {

    // Escuchar cambios de autenticación
    onAuthStateChanged(this.auth, async firebaseUser => {

      try {

        if (!firebaseUser) {
          this.currentUserSignal.set(null);
          return;
        }

        const profile = await this.loadProfile(
          firebaseUser.uid,
          firebaseUser.email,
          firebaseUser.displayName
        );

        this.currentUserSignal.set(profile);

      } catch (error) {

        console.error(
          'Error cargando el perfil:',
          error
        );

        this.currentUserSignal.set(null);

      } finally {

        if (!this.readyResolved) {
          this.readyResolved = true;
          this.resolveReady();
        }

      }

    }, error => {

      console.error('Error de autenticación:', error);

      if (!this.readyResolved) {
        this.readyResolved = true;
        this.resolveReady();
      }

    });

  }

  // Esperar a que Firebase restaure la sesión
  async waitUntilReady(): Promise<void> {
    await this.readyPromise;
  }

  // =====================================
  // REGISTRO DE USUARIOS
  // =====================================

  async register(
    name: string,
    email: string,
    password: string
  ): Promise<boolean> {

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (
      !cleanName ||
      !cleanEmail ||
      password.length < 6
    ) {
      return false;
    }

    try {

      // Crear cuenta real en Firebase Authentication
      const credential =
        await createUserWithEmailAndPassword(
          this.auth,
          cleanEmail,
          password
        );

      const newUser: FoodFlowUser = {
        id: credential.user.uid,
        name: cleanName,
        email: cleanEmail,
        // Los registros públicos siempre crean clientes. Los roles internos
        // se asignan desde Firebase Console por una persona administradora.
        role: 'cliente'
      };

      // Guardar perfil en Firestore
      await setDoc(
        doc(this.firestore, 'users', credential.user.uid),
        {
          ...newUser,
          createdAt: serverTimestamp()
        }
      );

      this.currentUserSignal.set(newUser);

      return true;

    } catch (error) {

      console.error('Error en el registro:', error);

      return false;

    }

  }

  // =====================================
  // INICIO DE SESIÓN
  // =====================================

  async login(
    email: string,
    password: string
  ): Promise<boolean> {

    const cleanEmail = email.trim().toLowerCase();

    try {

      // Autenticar con Firebase
      const credential =
        await signInWithEmailAndPassword(
          this.auth,
          cleanEmail,
          password
        );

      // Recuperar perfil desde Firestore
      const profile = await this.loadProfile(
        credential.user.uid,
        credential.user.email,
        credential.user.displayName
      );

      this.currentUserSignal.set(profile);

      return true;

    } catch (error) {

      console.error('Error al iniciar sesión:', error);

      return false;

    }

  }

  // =====================================
  // CARGAR PERFIL
  // =====================================

  private async loadProfile(
    uid: string,
    email: string | null,
    displayName: string | null
  ): Promise<FoodFlowUser> {

    const profileRef = doc(
      this.firestore,
      'users',
      uid
    );

    const profileSnapshot = await getDoc(profileRef);

    if (!profileSnapshot.exists()) {

      throw new Error(
        'No existe el perfil del usuario en Firestore.'
      );

    }

    const data = profileSnapshot.data();

    const role = this.isValidRole(data['role'])
      ? data['role']
      : 'cliente';

    return {
      id: uid,
      name: String(data['name'] ?? displayName ?? 'Usuario'),
      email: String(data['email'] ?? email ?? ''),
      role
    };

  }

  // =====================================
  // CIERRE DE SESIÓN
  // =====================================

  async logout(): Promise<void> {

    await signOut(this.auth);

    this.currentUserSignal.set(null);

  }

  // =====================================
  // CONTROL DE ROLES
  // =====================================

  hasRole(role: UserRole): boolean {

    return this.currentUserSignal()?.role === role;

  }

  isAuthenticated(): boolean {

    return this.currentUserSignal() !== null;

  }

  private isValidRole(role: unknown): role is UserRole {

    return (
      role === 'cliente' ||
      role === 'restaurante' ||
      role === 'domiciliario'
    );

  }

}
