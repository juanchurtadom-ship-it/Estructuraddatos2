import { inject } from '@angular/core';

import {
  CanActivateFn,
  Router
} from '@angular/router';

import { AuthService } from './auth.service';


export const authGuard: CanActivateFn =
  async (_route, state) => {

    const auth = inject(AuthService);
    const router = inject(Router);

    await auth.waitUntilReady();

    return auth.user()
      ? true
      : router.createUrlTree(
          ['/login'],
          {
            queryParams: {
              returnUrl: state.url
            }
          }
        );

  };


export const restaurantGuard: CanActivateFn =
  async () => {

    const auth = inject(AuthService);
    const router = inject(Router);

    await auth.waitUntilReady();

    const user = auth.user();

    if (!user) {
      return router.createUrlTree(['/login']);
    }

    return user.role === 'restaurante'
      ? true
      : router.createUrlTree(['/']);

  };