
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from './auth';

export const authGuard: CanActivateFn = async () => {

  const auth = inject(Auth);
  const router = inject(Router);

  await auth.esperarAutenticacion();

  if (auth.estaAutenticado()) {
    return true;
  }

  return router.createUrlTree(['/login']);
};
