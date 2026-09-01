import { Component, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule],
  template: `<form [formGroup]="form" (ngSubmit)="submit()" novalidate><div class="fields"><label>Nombre<input formControlName="name" placeholder="Ej. María Pérez" /></label><label>Teléfono<input formControlName="phone" placeholder="Ej. 300 123 4567" /></label></div><button type="submit">Agregar contacto</button></form>@if (form.touched && form.invalid) { <p class="error">Completa el nombre y el teléfono.</p> }`,
  styles: `form { display: flex; gap: 12px; margin: 28px 0 8px; align-items: end; } .fields { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; flex: 1; } label { display: grid; gap: 6px; color: #344256; font-size: .85rem; font-weight: 700; } input { border: 1px solid #cdd9e8; border-radius: 8px; padding: 11px; font: inherit; } input:focus { outline: 2px solid #9ec1ff; border-color: #2f6fed; } button { border: 0; border-radius: 8px; background: #2f6fed; color: white; cursor: pointer; font: inherit; font-weight: 700; padding: 12px 16px; white-space: nowrap; } button:hover { background: #2459be; } .error { color: #b42318; font-size: .85rem; margin: 0; } @media (max-width: 600px) { form, .fields { display: grid; grid-template-columns: 1fr; } }`
})
export class ContactFormComponent {
  readonly contactAdded = output<Omit<Contact, 'id'>>();
  readonly form = new FormBuilder().nonNullable.group({ name: ['', [Validators.required, Validators.minLength(2)]], phone: ['', [Validators.required, Validators.minLength(7)]] });
  submit(): void { if (this.form.invalid) { this.form.markAllAsTouched(); return; } this.contactAdded.emit(this.form.getRawValue()); this.form.reset(); }
}
