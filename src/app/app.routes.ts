import { Routes } from '@angular/router';
import { Songs } from './pages/songs/songs';
import { Browser } from './pages/browser/browser';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'songs',
    pathMatch: 'full'
  },
  {
    path: 'songs',
    component: Songs
  },
  {
    path: 'browser',
    component: Browser
  }
];