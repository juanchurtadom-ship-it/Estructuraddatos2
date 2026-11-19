import { Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { Tareas } from './pages/tareas/tareas';
import { authGuard } from './guards/auth.guard';
import { Challenge12 } from './pages/challenge-12/challenge-12';

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
    path: 'challenge-12',
    component: Challenge12
  },
  {
    path: '**',
    redirectTo: 'login'
  },
  
  
];
