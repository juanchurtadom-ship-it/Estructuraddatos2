import { Routes } from '@angular/router';
import { InicioSesion } from './componentes/inicio-sesion/inicio-sesion';
import { Registro } from './componentes/registro/registro';
import { ExploradorArchivos } from './componentes/explorador-archivos/explorador-archivos';
import { autenticacionGuard } from './seguridad/autenticacion-guard';

export const routes: Routes = [
  {
    path: 'login',
    component: InicioSesion
  },
  {
    path: 'registro',
    component: Registro
  },
  {
    path: 'explorador',
    component: ExploradorArchivos,
    canActivate: [autenticacionGuard]
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