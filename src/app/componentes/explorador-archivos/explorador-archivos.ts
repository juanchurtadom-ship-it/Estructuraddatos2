import { Component, OnInit } from '@angular/core';
import { GestorArchivosService } from '../../estructuras/gestor-archivos';
import { NodoArchivo } from '../../estructuras/nodo-archivo';
import { Router } from '@angular/router';
import { AutenticacionService } from '../../servicios/autenticacion';

interface ElementoVisual {
  nodo: NodoArchivo;
  nivel: number;
}

@Component({
  selector: 'app-explorador-archivos',
  standalone: true,
  imports: [],
  templateUrl: './explorador-archivos.html',
  styleUrl: './explorador-archivos.css'
})
export class ExploradorArchivos implements OnInit {
  

  carpetaSeleccionada = '';
  mensaje = '';

 constructor(
  public gestor: GestorArchivosService,
  private autenticacion: AutenticacionService,
  private router: Router
) {}
async ngOnInit(): Promise<void> {
  const uid = this.autenticacion.obtenerUidActual();
  const correo = this.autenticacion.obtenerCorreoActual();

  if (!uid || !correo) {
    await this.router.navigateByUrl('/login');
    return;
  }

  try {
    await this.gestor.inicializar(uid, correo);

    const raiz = this.gestor.raiz();
    this.carpetaSeleccionada = raiz?.id ?? '';
  } catch (error) {
    console.error('Error al cargar el árbol:', error);
    this.mensaje =
      'No se pudo cargar el árbol. Revisa la conexión y los permisos de Firestore.';
  }
}
get correoActual(): string {
  return this.autenticacion.obtenerCorreoActual() ?? '';
}

async cerrarSesion(): Promise<void> {
  try {
    await this.autenticacion.cerrarSesion();
    await this.router.navigateByUrl('/login');
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    this.mensaje = 'No se pudo cerrar la sesión.';
  }
}


  obtenerElementos(): ElementoVisual[] {
    const raiz = this.gestor.raiz();

    if (raiz === null) {
      return [];
    }

    const elementos: ElementoVisual[] = [];

    const recorrer = (nodo: NodoArchivo, nivel: number): void => {
      elementos.push({ nodo, nivel });

      for (const hijo of nodo.hijos) {
        recorrer(hijo, nivel + 1);
      }
    };

    recorrer(raiz, 0);

    return elementos;
  }

  seleccionarCarpeta(evento: Event): void {
    this.carpetaSeleccionada =
      (evento.target as HTMLSelectElement).value;
  }

  
async crearCarpeta(nombre: string): Promise<void> {
  const correo = this.autenticacion.obtenerCorreoActual();

  if (!correo) {
    this.mensaje = 'Debes iniciar sesión nuevamente.';
    await this.router.navigateByUrl('/login');
    return;
  }

  if (!nombre.trim()) {
    this.mensaje = 'Escribe el nombre de la carpeta.';
    return;
  }

  try {
    const creada = await this.gestor.crearCarpeta(
      this.carpetaSeleccionada,
      nombre,
      correo
    );

    this.mensaje = creada
      ? 'Carpeta creada y guardada correctamente.'
      : 'No se pudo crear la carpeta.';
  } catch (error) {
    console.error('Error al guardar la carpeta:', error);
    this.mensaje =
      'No se pudo guardar la carpeta en Firestore.';
  }
}

async crearArchivo(nombre: string): Promise<void> {
  const correo = this.autenticacion.obtenerCorreoActual();

  if (!correo) {
    this.mensaje = 'Debes iniciar sesión nuevamente.';
    await this.router.navigateByUrl('/login');
    return;
  }

  if (!nombre.trim()) {
    this.mensaje = 'Escribe el nombre del archivo.';
    return;
  }

  try {
    const creado = await this.gestor.crearArchivo(
      this.carpetaSeleccionada,
      nombre,
      correo
    );

    this.mensaje = creado
      ? 'Archivo creado y guardado correctamente.'
      : 'No se pudo crear el archivo.';
  } catch (error) {
    console.error('Error al guardar el archivo:', error);
    this.mensaje =
      'No se pudo guardar el archivo en Firestore.';
  }
}

  async eliminarElemento(id: string): Promise<void> {
    const elemento = this.obtenerElementos().find(
      item => item.nodo.id === id
    );

    if (!elemento || elemento.nivel === 0) {
      this.mensaje = 'La carpeta principal no se puede eliminar.';
      return;
    }

    const tieneHijos = elemento.nodo.hijos.length > 0;

    const confirmacion = tieneHijos
      ? `¿Eliminar "${elemento.nodo.nombre}" y todo su contenido?`
      : `¿Eliminar "${elemento.nodo.nombre}"?`;

    if (!confirm(confirmacion)) {
      return;
    }

    try {
      const eliminado =
        await this.gestor.eliminarElemento(id);

      if (eliminado) {
        this.carpetaSeleccionada =
          this.gestor.raiz()?.id ?? '';

        this.mensaje = tieneHijos
          ? 'Carpeta y contenido eliminados correctamente.'
          : 'Elemento eliminado correctamente.';
      } else {
        this.mensaje = 'No se pudo eliminar el elemento.';
      }
    } catch (error) {
      console.error('Error al eliminar elemento:', error);
      this.mensaje =
        'No se pudo guardar la eliminación en Firestore.';
    }
  }

}