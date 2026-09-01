import { Component, input, output } from '@angular/core';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-contact-list',
  template: `<section aria-labelledby="contacts-title"><div class="list-heading"><h2 id="contacts-title">Lista de contactos</h2><span>{{ contacts().length }}</span></div>@if (contacts().length === 0) { <p class="empty">Aún no hay contactos. Agrega el primero.</p> } @else { <ul>@for (contact of contacts(); track contact.id) { <li><div><strong>{{ contact.name }}</strong><span>{{ contact.phone }}</span></div><button (click)="contactDeleted.emit(contact.id)" [attr.aria-label]="'Eliminar a ' + contact.name">Eliminar</button></li> }</ul> }</section>`,
  styles: `section { margin-top: 30px; } .list-heading { display: flex; align-items: center; justify-content: space-between; } h2 { font-size: 1.1rem; } .list-heading span { background: #e7f0ff; color: #2459be; padding: 3px 10px; border-radius: 99px; font-weight: 700; } ul { list-style: none; margin: 12px 0 0; padding: 0; display: grid; gap: 10px; } li { align-items: center; background: #f8fafc; border: 1px solid #e5eaf0; border-radius: 10px; display: flex; justify-content: space-between; padding: 14px; } li div { display: grid; gap: 4px; } li span, .empty { color: #627187; font-size: .9rem; } button { background: transparent; border: 1px solid #e3b4b1; border-radius: 7px; color: #b42318; cursor: pointer; font: inherit; padding: 7px 10px; } button:hover { background: #fff0ef; } .empty { background: #f8fafc; border-radius: 8px; padding: 16px; }`
})
export class ContactListComponent {
  readonly contacts = input.required<Contact[]>();
  readonly contactDeleted = output<number>();
}
