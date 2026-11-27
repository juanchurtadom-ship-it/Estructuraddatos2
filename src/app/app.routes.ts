import { Routes } from '@angular/router';

import { LoginComponent } from './features/team/login.component';
import { RegisterComponent } from './features/team/register.component';
import { RestaurantDashboardComponent } from './features/team/restaurant-dashboard.component';

import { authGuard, restaurantGuard } from './features/team/auth.guard';

export const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'registro',
    component: RegisterComponent
  },

  {
    path: 'restaurante',
    component: RestaurantDashboardComponent,
    canActivate: [authGuard, restaurantGuard]
  },

  {
    path: '**',
    redirectTo: ''
  }

];