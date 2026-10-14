
import { NodoArchivo } from './nodo-archivo';

export class ArbolArchivos {
  raiz: NodoArchivo | null;

  constructor() {
    this.raiz = null;
  }

  establecerRaiz(raiz: NodoArchivo): void {
    if (!raiz.esCarpeta()) {
      throw new Error('La raíz del árbol debe ser una carpeta.');
    }

    this.raiz = raiz;
  }

  agregarElemento(
    padreId: string,
    elemento: NodoArchivo
  ): boolean {
    const padre = this.buscarPorId(padreId);

    if (padre === null) {
      return false;
    }

    padre.agregarHijo(elemento);
    return true;
  }

  buscarPorId(id: string): NodoArchivo | null {
    if (this.raiz === null) {
      return null;
    }

    return this.buscarRecursivo(this.raiz, id);
  }

  private buscarRecursivo(
    actual: NodoArchivo,
    id: string
  ): NodoArchivo | null {
    if (actual.id === id) {
      return actual;
    }

    for (const hijo of actual.hijos) {
      const encontrado = this.buscarRecursivo(hijo, id);

      if (encontrado !== null) {
        return encontrado;
      }
    }

    return null;
  }
  
  eliminarElemento(id: string): boolean {
    if (this.raiz === null || this.raiz.id === id) {
      return false;
    }

    return this.eliminarRecursivo(this.raiz, id);
  }

  private eliminarRecursivo(
    actual: NodoArchivo,
    id: string
  ): boolean {
    const indice = actual.hijos.findIndex(
      hijo => hijo.id === id
    );

    if (indice !== -1) {
      actual.hijos.splice(indice, 1);
      return true;
    }

    for (const hijo of actual.hijos) {
      if (this.eliminarRecursivo(hijo, id)) {
        return true;
      }
    }

    return false;
  }

}
