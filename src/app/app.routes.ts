import { Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { Tareas } from './pages/tareas/tareas';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tareas',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'tareas',
    component: Tareas,
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];