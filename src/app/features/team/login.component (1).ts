<main class="auth-page">
  <section class="auth-card">
    <a class="brand" routerLink="/">Food<span>Flow</span></a>
    <p class="eyebrow">ÚNETE A FOODFLOW</p>
    <h1>Crea tu cuenta</h1>
    <p class="subtitle">Completa tus datos para comenzar.</p>

    <form (ngSubmit)="submit()" #registerForm="ngForm">
      <label for="name">Nombre</label>
      <input id="name" name="name" [(ngModel)]="name" placeholder="Tu nombre" autocomplete="name" required />

      <label for="email">Correo electrónico</label>
      <input id="email" name="email" type="email" [(ngModel)]="email" placeholder="tu@correo.com" autocomplete="email" required email />

      <label for="password">Contraseña</label>
      <input id="password" name="password" type="password" [(ngModel)]="password" placeholder="Mínimo 6 caracteres" autocomplete="new-password" required minlength="6" />

      <label for="role">Tipo de cuenta</label>
      <select id="role" name="role" [(ngModel)]="role">
        <option value="cliente">Cliente</option>
        <option value="restaurante">Restaurante</option>
        <option value="domiciliario">Domiciliario</option>
      </select>

      @if (errorMessage) {
        <p class="error-message" role="alert">{{ errorMessage }}</p>
      }

      <button type="submit" [disabled]="registerForm.invalid">Crear cuenta</button>
    </form>

    <p class="switch-link">¿Ya tienes cuenta? <a routerLink="/login">Inicia sesión</a></p>
    <a class="back-link" routerLink="/">← Volver al inicio</a>
  </section>
</main>
