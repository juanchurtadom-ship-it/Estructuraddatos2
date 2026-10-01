import { NodoMenu } from './nodo-menu';

export class ArbolNArio {
  raiz: NodoMenu | null;

  constructor() {
    this.raiz = null;
  }

  establecerRaiz(nodo: NodoMenu): void {
    this.raiz = nodo;
  }

  agregarHijo(
    padre: NodoMenu,
    hijo: NodoMenu
  ): void {
    padre.addChild(hijo);
  }
}