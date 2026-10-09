
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../auth';
import { TareasService, Tarea } from '../services/tareas';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tareas',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './tareas.html',
  styleUrl: './tareas.scss'
})
export class Tareas implements OnInit {

  private auth = inject(Auth);
  private servicioTareas = inject(TareasService);
  private router = inject(Router);

  tareas: Tarea[] = [];
  titulo = '';
  descripcion = '';
  mensaje = '';
  cargando = false;
  editandoId: string | null = null;

  async ngOnInit(): Promise<void> {
    await this.cargarTareas();
  }

  async cargarTareas(): Promise<void> {
    const usuario = this.auth.usuario();

    if (!usuario) {
      await this.router.navigate(['/login']);
      return;
    }

    this.cargando = true;

    try {
      this.tareas = await this.servicioTareas.obtenerTodas(usuario.uid);
    } catch (error) {
      console.error(error);
      this.mensaje = 'No se pudieron cargar las tareas.';
    } finally {
      this.cargando = false;
    }
  }

  async guardarTarea(): Promise<void> {
    const usuario = this.auth.usuario();

    if (!usuario || !this.titulo.trim()) {
      this.mensaje = 'Escribe un título para la tarea.';
      return;
    }

    this.mensaje = '';

    try {
      if (this.editandoId) {
        await this.servicioTareas.actualizar(this.editandoId, {
          titulo: this.titulo.trim(),
          descripcion: this.descripcion.trim()
        });
      } else {
        await this.servicioTareas.crear({
          titulo: this.titulo.trim(),
          descripcion: this.descripcion.trim(),
          completada: false,
          usuarioId: usuario.uid
        });
      }

      this.titulo = '';
      this.descripcion = '';
      this.editandoId = null;

      await this.cargarTareas();
    } catch (error) {
      console.error(error);
      this.mensaje = 'No se pudo guardar la tarea.';
    }
  }

  editarTarea(tarea: Tarea): void {
    this.editandoId = tarea.id ?? null;
    this.titulo = tarea.titulo;
    this.descripcion = tarea.descripcion;
    this.mensaje = '';
  }

  cancelarEdicion(): void {
    this.editandoId = null;
    this.titulo = '';
    this.descripcion = '';
    this.mensaje = '';
  }

  async cambiarEstado(tarea: Tarea): Promise<void> {
    if (!tarea.id) return;

    try {
      await this.servicioTareas.actualizar(tarea.id, {
        completada: !tarea.completada
      });

      await this.cargarTareas();
    } catch (error) {
      console.error(error);
      this.mensaje = 'No se pudo actualizar el estado.';
    }
  }

  async eliminarTarea(tarea: Tarea): Promise<void> {
    if (!tarea.id) return;

    if (!confirm(`¿Deseas eliminar "${tarea.titulo}"?`)) return;

    try {
      await this.servicioTareas.eliminar(tarea.id);
      await this.cargarTareas();
    } catch (error) {
      console.error(error);
      this.mensaje = 'No se pudo eliminar la tarea.';
    }
  }

  async cerrarSesion(): Promise<void> {
    await this.auth.logout();
    await this.router.navigate(['/login']);
  }
}
