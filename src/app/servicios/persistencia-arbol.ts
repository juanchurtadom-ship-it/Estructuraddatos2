
import { Injectable } from '@angular/core';

import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp
} from 'firebase/firestore';

import { db } from '../firebase/config';
import {
  NodoArchivo,
  TipoElemento
} from '../estructuras/nodo-archivo';

interface NodoGuardado {
  id: string;
  nombre: string;
  tipo: TipoElemento;
  creadoPor: string;
  hijos: NodoGuardado[];
}

@Injectable({
  providedIn: 'root'
})
export class PersistenciaArbolService {

  async guardarArbol(
    uid: string,
    raiz: NodoArchivo
  ): Promise<void> {
    const referencia = doc(db, 'arboles', uid);

    await setDoc(referencia, {
      raiz: this.convertirNodo(raiz),
      actualizadoEn: serverTimestamp()
    });
  }

  async cargarArbol(
    uid: string
  ): Promise<NodoArchivo | null> {
    const referencia = doc(db, 'arboles', uid);
    const documento = await getDoc(referencia);

    if (!documento.exists()) {
      return null;
    }

    const datos = documento.data() as {
      raiz?: NodoGuardado;
    };

    if (!datos.raiz) {
      return null;
    }

    return this.reconstruirNodo(datos.raiz);
  }

  private convertirNodo(
    nodo: NodoArchivo
  ): NodoGuardado {
    return {
      id: nodo.id,
      nombre: nodo.nombre,
      tipo: nodo.tipo,
      creadoPor: nodo.creadoPor,
      hijos: nodo.hijos.map(
        hijo => this.convertirNodo(hijo)
      )
    };
  }

  private reconstruirNodo(
    datos: NodoGuardado
  ): NodoArchivo {
    const nodo = new NodoArchivo(
      datos.nombre,
      datos.tipo,
      datos.creadoPor,
      datos.id
    );

    for (const hijo of datos.hijos ?? []) {
      nodo.agregarHijo(
        this.reconstruirNodo(hijo)
      );
    }

    return nodo;
  }
}
