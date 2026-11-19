
import { Routes } from '@angular/router';
import { BuscadorGifs } from './pages/buscador-gifs/buscador-gifs';

export const routes: Routes = [
  {
    path: '',
    component: BuscadorGifs
  },
  {
    path: '**',
    redirectTo: ''
  }
];
