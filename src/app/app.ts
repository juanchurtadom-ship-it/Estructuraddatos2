import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Person } from './models/person';
import { Queue } from './queue/queue';


@Component({
  selector: 'app-root',
  imports: [FormsModule,CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  queue = new Queue<Person>();

  name: string = '';
  withdrawalAmount: number = 0;

  people: Person[] = [];

  constructor() {
    this.loadMockData();
  }

  loadMockData(): void {
    this.queue.enqueue({
      name: 'Juan',
      withdrawalAmount: 200000,
      arrivalDate: new Date(Date.now() - 30 * 60000)
    });

    this.queue.enqueue({
      name: 'Maria',
      withdrawalAmount: 500000,
      arrivalDate: new Date(Date.now() - 20 * 60000)
    });

    this.queue.enqueue({
      name: 'Carlos',
      withdrawalAmount: 100000,
      arrivalDate: new Date(Date.now() - 10 * 60000)
    });

    this.updatePeople();
  }

  addPerson(): void {

    if (!this.name || this.withdrawalAmount <= 0) {
      return;
    }

    const person: Person = {
      name: this.name,
      withdrawalAmount: this.withdrawalAmount,
      arrivalDate: new Date()
    };

    this.queue.enqueue(person);

    this.name = '';
    this.withdrawalAmount = 0;

    this.updatePeople();
  }

  updatePeople(): void {
    this.people = this.queue
      .print()
      .sort((a, b) => a.arrivalDate.getTime() - b.arrivalDate.getTime());
  }

  removeFirstPerson(): void {
    this.queue.dequeue();
    this.updatePeople();
  }
}