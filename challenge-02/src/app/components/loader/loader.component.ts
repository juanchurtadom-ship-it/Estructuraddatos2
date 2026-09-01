import { Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `<div class="loader" role="status"><span class="spinner" aria-hidden="true"></span><p>Cargando contactos...</p></div>`,
  styles: `.loader { min-height: 250px; display: grid; place-content: center; justify-items: center; gap: 16px; color: #516174; } .spinner { width: 42px; height: 42px; border: 4px solid #dce7f5; border-top-color: #2f6fed; border-radius: 50%; animation: spin .8s linear infinite; } p { margin: 0; font-weight: 600; } @keyframes spin { to { transform: rotate(360deg); } }`
})
export class LoaderComponent {}
