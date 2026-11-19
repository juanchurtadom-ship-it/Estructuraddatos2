
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GiphyService } from '../../services/giphy';

@Component({
  selector: 'app-buscador-gifs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './buscador-gifs.html',
  styleUrl: './buscador-gifs.css'
})
export class BuscadorGifs {

  private giphyService = inject(GiphyService);

  termino = '';
  gifs: any[] = [];
  cargando = false;
  error = '';

  buscar(): void {
    if (!this.termino.trim()) {
      return;
    }

    this.cargando = true;
    this.error = '';

    this.giphyService.buscarGifs(this.termino).subscribe({
      next: (respuesta) => {
        this.gifs = respuesta.data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al buscar GIFs:', err);
        this.error = 'No fue posible cargar los GIFs.';
        this.cargando = false;
      }
    });
  }
}
