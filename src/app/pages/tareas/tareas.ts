import {
  Component,
  OnInit,
  OnDestroy,
  inject,
  signal
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { RealtimeChannel } from '@supabase/supabase-js';

import { TareasService } from '../../services/tareas';
import { SupabaseService } from '../../services/supabase';

interface Tarea {
  id: number;
  titulo: string;
  completada: boolean;
  user_id: string;
  created_at: string;
}

@Component({
  selector: 'app-tareas',
  imports: [FormsModule],
  templateUrl: './tareas.html'
})
export class Tareas implements OnInit, OnDestroy {

  private srv = inject(TareasService);
  private sb = inject(SupabaseService).client;

  tareas = signal<Tarea[]>([]);
  nueva = '';
  mensaje = signal('');

  private canal: RealtimeChannel | null = null;

  async ngOnInit() {
    await this.cargar();

    this.canal = this.srv.escuchar(() => {
      this.cargar();
    });
  }

  async cargar() {
    const { data, error } = await this.srv.listar();

    if (error) {
      this.mensaje.set(error.message);
      return;
    }

    this.tareas.set((data ?? []) as Tarea[]);
  }

  async agregar() {
    if (!this.nueva.trim()) return;

    const { error } = await this.srv.crear(this.nueva.trim());

    if (error) {
      this.mensaje.set(error.message);
      return;
    }

    this.nueva = '';
    this.mensaje.set('');
    await this.cargar();
  }

  async completar(tarea: Tarea, event: Event) {
    const valor = (event.target as HTMLInputElement).checked;

    const { error } = await this.srv.completar(
      tarea.id,
      valor
    );

    if (error) {
      this.mensaje.set(error.message);
      return;
    }

    await this.cargar();
  }

  async borrar(id: number) {
    const { error } = await this.srv.borrar(id);

    if (error) {
      this.mensaje.set(error.message);
      return;
    }

    await this.cargar();
  }

  ngOnDestroy() {
    if (this.canal) {
      this.sb.removeChannel(this.canal);
    }
  }
}