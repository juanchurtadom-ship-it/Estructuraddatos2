import { Component, OnInit, signal } from '@angular/core';
import { Contact } from './models/contact.model';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { LoaderComponent } from './components/loader/loader.component';

@Component({
  selector: 'app-root',
  imports: [ContactFormComponent, ContactListComponent, LoaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly loading = signal(true);
  protected readonly contacts = signal<Contact[]>([]);

  ngOnInit(): void {
    // Simula la espera de una petición a un servidor.
    setTimeout(() => {
      this.contacts.set([
        { id: 1, name: 'Ana Torres', phone: '300 123 4567' },
        { id: 2, name: 'Carlos Ruiz', phone: '310 987 6543' },
        { id: 3, name: 'Laura Gómez', phone: '315 456 7890' }
      ]);
      this.loading.set(false);
    }, 1500);
  }

  protected addContact(contact: Omit<Contact, 'id'>): void {
    this.contacts.update((contacts) => [...contacts, { ...contact, id: Date.now() }]);
  }

  protected deleteContact(id: number): void {
    this.contacts.update((contacts) => contacts.filter((contact) => contact.id !== id));
  }
}
