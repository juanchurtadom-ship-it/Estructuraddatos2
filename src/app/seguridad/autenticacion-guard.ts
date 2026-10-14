
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';

export const autenticacionGuard: CanActivateFn = () => {
  const router = inject(Router);

  return new Promise<boolean | ReturnType<Router['parseUrl']>>(
    (resolve) => {
      let cancelar: () => void = () => {};

      cancelar = onAuthStateChanged(
        auth,
        (usuario) => {
          cancelar();

          if (usuario) {
            resolve(true);
          } else {
            resolve(router.parseUrl('/login'));
          }
        },
        () => {
          cancelar();
          resolve(router.parseUrl('/login'));
        }
      );
    }
  );
};