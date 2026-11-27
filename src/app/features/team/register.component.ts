import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  Router,
  RouterLink
} from '@angular/router';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {

  name = '';
  email = '';
  password = '';

  errorMessage = '';
  loading = false;

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router
  ) {}

  async submit(): Promise<void> {

    this.errorMessage = '';
    this.loading = true;

    try {

      const created = await this.auth.register(
        this.name,
        this.email,
        this.password
      );

      if (!created) {

        this.errorMessage =
          'No se pudo crear la cuenta. Comprueba los datos o utiliza otro correo.';

        return;
      }

      await this.router.navigateByUrl('/');

    } finally {

      this.loading = false;

    }

  }

}
