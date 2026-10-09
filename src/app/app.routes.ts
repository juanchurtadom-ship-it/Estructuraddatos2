
import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';
import { Ejercicio1 } from './ejercicio1/ejercicio1';
import { Ejercicio2 } from './ejercicio2/ejercicio2';
import { authGuard } from './auth-guard-guard';
import { Tareas } from './tareas/tareas';

export const routes: Routes = [
{
  path: 'tareas',
  component: Tareas,
  canActivate: [authGuard]
},
  {
    path: 'login',
    component: Login
  },

  {
    path: 'register',
    component: Register
  },

  {
    path: 'ejercicio1',
    component: Ejercicio1,
    canActivate: [authGuard]
  },

  {
    path: 'ejercicio2',
    component: Ejercicio2,
    canActivate: [authGuard]
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: '**',
    redirectTo: 'login'
  }
  

];
