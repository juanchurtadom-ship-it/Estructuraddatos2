
import { Injectable, signal } from '@angular/core';
import { ArbolArchivos } from './arbol-archivos';
import { NodoArchivo } from './nodo-archivo';
import { PersistenciaArbolService } from '../servicios/persistencia-arbol';

@Injectable({
  providedIn: 'root'
})
export class GestorArchivosService {
  private arbol = new ArbolArchivos();
  private uidActual: string | null = null;

  readonly raiz = signal<NodoArchivo | null>(null);

  constructor(
    private persistencia: PersistenciaArbolService
  ) {}

  async inicializar(
    uid: string,
    correo: string
  ): Promise<void> {
    this.uidActual = uid;

    const raizGuardada =
      await this.persistencia.cargarArbol(uid);

    if (raizGuardada) {
      this.arbol.establecerRaiz(raizGuardada);
    } else {
      const raiz = new NodoArchivo(
        'Mis archivos',
        'carpeta',
        correo
      );

      this.arbol.establecerRaiz(raiz);

      await this.persistencia.guardarArbol(uid, raiz);
    }

    this.actualizarVista();
  }

  async crearCarpeta(
    padreId: string,
    nombre: string,
    correo: string
  ): Promise<boolean> {
    const nombreLimpio = nombre.trim();

    if (!nombreLimpio) {
      return false;
    }

    const carpeta = new NodoArchivo(
      nombreLimpio,
      'carpeta',
      correo
    );

    return this.agregarYGuardar(padreId, carpeta);
  }

  async crearArchivo(
    padreId: string,
    nombre: string,
    correo: string
  ): Promise<boolean> {
    const nombreLimpio = nombre.trim();

    if (!nombreLimpio) {
      return false;
    }

    const archivo = new NodoArchivo(
      nombreLimpio,
      'archivo',
      correo
    );

    return this.agregarYGuardar(padreId, archivo);
  }

  private async agregarYGuardar(
    padreId: string,
    elemento: NodoArchivo
  ): Promise<boolean> {
    const uid = this.uidActual;

    if (!uid) {
      return false;
    }

    const raizAnterior = this.arbol.raiz
      ? this.clonarNodo(this.arbol.raiz)
      : null;

    try {
      const agregado = this.arbol.agregarElemento(
        padreId,
        elemento
      );

      if (!agregado || !this.arbol.raiz) {
        return false;
      }

      await this.persistencia.guardarArbol(
        uid,
        this.arbol.raiz
      );

      this.actualizarVista();
      return true;
    } catch (error) {
      if (raizAnterior) {
        this.arbol.establecerRaiz(raizAnterior);
        this.actualizarVista();
      }

      throw error;
    }
  }
  
  async eliminarElemento(id: string): Promise<boolean> {
    const uid = this.uidActual;

    if (!uid || !this.arbol.raiz) {
      return false;
    }

    const raizAnterior = this.clonarNodo(this.arbol.raiz);

    try {
      const eliminado = this.arbol.eliminarElemento(id);

      if (!eliminado || !this.arbol.raiz) {
        return false;
      }

      await this.persistencia.guardarArbol(
        uid,
        this.arbol.raiz
      );

      this.actualizarVista();
      return true;
    } catch (error) {
      this.arbol.establecerRaiz(raizAnterior);
      this.actualizarVista();
      throw error;
    }
  }


  private actualizarVista(): void {
    const raiz = this.arbol.raiz;

    this.raiz.set(
      raiz ? this.clonarNodo(raiz) : null
    );
  }

  private clonarNodo(nodo: NodoArchivo): NodoArchivo {
    const copia = new NodoArchivo(
      nodo.nombre,
      nodo.tipo,
      nodo.creadoPor,
      nodo.id
    );

    for (const hijo of nodo.hijos) {
      copia.agregarHijo(this.clonarNodo(hijo));
    }

    return copia;
  }
}
