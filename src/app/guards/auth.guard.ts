import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from '../services/supabase';

export const authGuard: CanActivateFn = async () => {

  const sb = inject(SupabaseService).client;
  const router = inject(Router);

  const { data } = await sb.auth.getSession();

  return data.session
    ? true
    : router.createUrlTree(['/login']);

};