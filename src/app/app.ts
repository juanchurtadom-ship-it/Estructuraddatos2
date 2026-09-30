import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild
} from '@angular/core';

import * as d3 from 'd3';

import { ArbolBinario } from './arbol-binario';
import { Nodo } from './nodo';

interface NodoD3 {
  valor: number;
  children?: NodoD3[];
}

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit {

  arbol = new ArbolBinario();

  @ViewChild('contenedorArbol')
  contenedorArbol!: ElementRef;


  constructor() {

    

    this.arbol.insertar(50);
    this.arbol.insertar(30);
    this.arbol.insertar(70);
    this.arbol.insertar(20);
    this.arbol.insertar(40);
    this.arbol.insertar(60);
    this.arbol.insertar(80);


    

    console.log(
      'PreOrder:',
      this.arbol.preOrden()
    );

    console.log(
      'InOrder:',
      this.arbol.inOrden()
    );

    console.log(
      'PostOrder:',
      this.arbol.postOrden()
    );


    

    console.log(
      '¿Está el 40?',
      this.arbol.buscar(40)
    );

    console.log(
      '¿Está el 100?',
      this.arbol.buscar(100)
    );
  }


  

  ngAfterViewInit(): void {
    this.dibujarArbol();
  }


  

  private convertirNodo(
    nodo: Nodo | null
  ): NodoD3 | null {

    if (nodo === null) {
      return null;
    }

    const resultado: NodoD3 = {
      valor: nodo.valor
    };

    const hijos: NodoD3[] = [];


    

    if (nodo.izquierdo !== null) {

      const izquierdo = this.convertirNodo(
        nodo.izquierdo
      );

      if (izquierdo !== null) {
        hijos.push(izquierdo);
      }
    }


    

    if (nodo.derecho !== null) {

      const derecho = this.convertirNodo(
        nodo.derecho
      );

      if (derecho !== null) {
        hijos.push(derecho);
      }
    }


    if (hijos.length > 0) {
      resultado.children = hijos;
    }

    return resultado;
  }


  

  private dibujarArbol(): void {

    const datos = this.convertirNodo(
      this.arbol.raiz
    );

    if (datos === null) {
      return;
    }


    

    d3.select(
      this.contenedorArbol.nativeElement
    )
      .selectAll('*')
      .remove();


  

    const raiz = d3.hierarchy<NodoD3>(datos);




    const ancho = 800;
    const alto = 450;


    

    const arbolD3 = d3
      .tree<NodoD3>()
      .size([
        ancho - 100,
        alto - 100
      ]);

    arbolD3(raiz);


    const svg = d3
      .select(
        this.contenedorArbol.nativeElement
      )
      .append('svg')
      .attr('width', ancho)
      .attr('height', alto)
      .attr(
        'viewBox',
        `0 0 ${ancho} ${alto}`
      );


    

    const grupo = svg
      .append('g')
      .attr(
        'transform',
        'translate(50, 50)'
      );


   

    grupo
      .selectAll('line')
      .data(raiz.links())
      .join('line')
      .attr(
        'x1',
        d => d.source.x ?? 0
      )
      .attr(
        'y1',
        d => d.source.y ?? 0
      )
      .attr(
        'x2',
        d => d.target.x ?? 0
      )
      .attr(
        'y2',
        d => d.target.y ?? 0
      )
      .attr(
        'stroke',
        '#555'
      )
      .attr(
        'stroke-width',
        2
      );


    
    const nodos = grupo
      .selectAll('g.nodo')
      .data(raiz.descendants())
      .join('g')
      .attr(
        'class',
        'nodo'
      )
      .attr(
        'transform',
        d =>
          `translate(${d.x ?? 0}, ${d.y ?? 0})`
      );


    

    nodos
      .append('circle')
      .attr('r', 25)
      .attr(
        'fill',
        'white'
      )
      .attr(
        'stroke',
        '#333'
      )
      .attr(
        'stroke-width',
        3
      );


    

    nodos
      .append('text')
      .attr(
        'text-anchor',
        'middle'
      )
      .attr(
        'dy',
        '5'
      )
      .attr(
        'font-size',
        '16px'
      )
      .attr(
        'font-weight',
        'bold'
      )
      .text(
        d => d.data.valor
      );
  }
}