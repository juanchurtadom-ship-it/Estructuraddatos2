import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService, UserRole } from './auth.service';

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
  role: UserRole = 'cliente';
  errorMessage = '';

  constructor(private readonly auth: AuthService, private readonly router: Router) {}

  submit(): void {
    this.errorMessage = '';
    const created = this.auth.register(this.name, this.email, this.password, this.role);

    if (!created) {
      this.errorMessage = 'No se pudo crear la cuenta. Revisa los datos o utiliza otro correo.';
      return;
    }

    void this.router.navigateByUrl(this.role === 'restaurante' ? '/restaurante' : '/');
  }
}
