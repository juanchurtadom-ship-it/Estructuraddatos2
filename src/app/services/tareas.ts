import { Injectable, inject } from '@angular/core';
import { SupabaseService } from './supabase';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  private sb = inject(SupabaseService).client;

  listar() {
    return this.sb
      .from('tareas')
      .select('*')
      .order('created_at', { ascending: false });
  }

  crear(titulo: string) {
    return this.sb
      .from('tareas')
      .insert({ titulo });
  }

  completar(id: number, valor: boolean) {
    return this.sb
      .from('tareas')
      .update({ completada: valor })
      .eq('id', id);
  }

  borrar(id: number) {
    return this.sb
      .from('tareas')
      .delete()
      .eq('id', id);
  }

  escuchar(alCambiar: () => void) {
    return this.sb
      .channel('tareas-ng')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tareas'
        },
        () => alCambiar()
      )
      .subscribe();
  }
}