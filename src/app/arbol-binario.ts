import { Nodo } from './nodo';

export class ArbolBinario {
  raiz: Nodo | null;

  constructor() {
    this.raiz = null;
  }

  insertar(valor: number): void {
    const nuevoNodo = new Nodo(valor);

    if (this.raiz === null) {
      this.raiz = nuevoNodo;
      return;
    }

    this.insertarNodo(this.raiz, nuevoNodo);
  }

  private insertarNodo(actual: Nodo, nuevoNodo: Nodo): void {
    if (nuevoNodo.valor === actual.valor) {
      return;
    }

    if (nuevoNodo.valor < actual.valor) {
      if (actual.izquierdo === null) {
        actual.izquierdo = nuevoNodo;
      } else {
        this.insertarNodo(actual.izquierdo, nuevoNodo);
      }
    } else {
      if (actual.derecho === null) {
        actual.derecho = nuevoNodo;
      } else {
        this.insertarNodo(actual.derecho, nuevoNodo);
      }
    }
  }


  preOrden(): number[] {
    const resultado: number[] = [];

    this.recorrerPreOrden(this.raiz, resultado);

    return resultado;
  }

  private recorrerPreOrden(
    nodo: Nodo | null,
    resultado: number[]
  ): void {
    if (nodo === null) {
      return;
    }

    resultado.push(nodo.valor);

    this.recorrerPreOrden(nodo.izquierdo, resultado);
    this.recorrerPreOrden(nodo.derecho, resultado);
  }

  
  inOrden(): number[] {
    const resultado: number[] = [];

    this.recorrerInOrden(this.raiz, resultado);

    return resultado;
  }

  private recorrerInOrden(
    nodo: Nodo | null,
    resultado: number[]
  ): void {
    if (nodo === null) {
      return;
    }

    this.recorrerInOrden(nodo.izquierdo, resultado);

    resultado.push(nodo.valor);

    this.recorrerInOrden(nodo.derecho, resultado);
  }

  
  postOrden(): number[] {
    const resultado: number[] = [];

    this.recorrerPostOrden(this.raiz, resultado);

    return resultado;
  }

  private recorrerPostOrden(
    nodo: Nodo | null,
    resultado: number[]
  ): void {
    if (nodo === null) {
      return;
    }

    this.recorrerPostOrden(nodo.izquierdo, resultado);
    this.recorrerPostOrden(nodo.derecho, resultado);

    resultado.push(nodo.valor);
  }

  
  buscar(valor: number): boolean {
    return this.buscarNodo(this.raiz, valor);
  }

  private buscarNodo(
    nodo: Nodo | null,
    valor: number
  ): boolean {
    if (nodo === null) {
      return false;
    }

    if (valor === nodo.valor) {
      return true;
    }

    if (valor < nodo.valor) {
      return this.buscarNodo(nodo.izquierdo, valor);
    }

    return this.buscarNodo(nodo.derecho, valor);
  }
}