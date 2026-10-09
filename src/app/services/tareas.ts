
import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where
} from 'firebase/firestore';

import { db } from '../firebase/config';

export interface Tarea {
  id?: string;
  titulo: string;
  descripcion: string;
  completada: boolean;
  usuarioId: string;
}

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  private coleccion = collection(db, 'tareas');

  async obtenerTodas(usuarioId: string): Promise<Tarea[]> {
    const consulta = query(
      this.coleccion,
      where('usuarioId', '==', usuarioId)
    );

    const resultado = await getDocs(consulta);

    return resultado.docs.map(documento => ({
      id: documento.id,
      ...documento.data()
    } as Tarea));
  }

  async crear(
    tarea: Omit<Tarea, 'id'>
  ): Promise<void> {
    await addDoc(this.coleccion, tarea);
  }

  async actualizar(
    id: string,
    cambios: Partial<Omit<Tarea, 'id' | 'usuarioId'>>
  ): Promise<void> {
    const referencia = doc(db, 'tareas', id);
    await updateDoc(referencia, cambios);
  }

  async eliminar(id: string): Promise<void> {
    const referencia = doc(db, 'tareas', id);
    await deleteDoc(referencia);
  }
}
