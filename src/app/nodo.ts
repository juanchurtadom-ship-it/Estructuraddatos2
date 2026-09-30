export class Nodo {
  valor: number;
  izquierdo: Nodo | null;
  derecho: Nodo | null;

  constructor(valor: number) {
    this.valor = valor;
    this.izquierdo = null;
    this.derecho = null;
  }

  esHoja(): boolean {
    return this.izquierdo === null && this.derecho === null;
  }
}