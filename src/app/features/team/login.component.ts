import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  ActivatedRoute,
  Router,
  RouterLink
} from '@angular/router';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  email = '';
  password = '';
  errorMessage = '';
  loading = false;

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  async submit(): Promise<void> {

    this.errorMessage = '';
    this.loading = true;

    try {

      const authenticated = await this.auth.login(
        this.email,
        this.password
      );

      if (!authenticated) {

        this.errorMessage =
          'No fue posible iniciar sesión. Verifica tu correo y contraseña.';

        return;
      }

      const returnUrl =
        this.route.snapshot.queryParamMap.get('returnUrl');

      const destination =
        returnUrl ||
        (
          this.auth.user()?.role === 'restaurante'
            ? '/restaurante'
            : '/'
        );

      await this.router.navigateByUrl(destination);

    } finally {

      this.loading = false;

    }

  }

}