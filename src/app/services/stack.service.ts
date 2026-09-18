import { Injectable } from '@angular/core';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class StackService {

  private stack: Book[] = [
    {
      name: 'Cien años de soledad',
      isbn: '978-0307474728',
      author: 'Gabriel García Márquez',
      editorial: 'Vintage'
    },
    {
      name: 'El principito',
      isbn: '978-0156012195',
      author: 'Antoine de Saint-Exupéry',
      editorial: 'Harcourt'
    },
    {
      name: 'Clean Code',
      isbn: '978-0132350884',
      author: 'Robert C. Martin',
      editorial: 'Prentice Hall'
    }
  ];

  push(book: Book): void {
    this.stack.push(book);
  }

  pop(): Book | undefined {
    return this.stack.pop();
  }

  peek(): Book | undefined {
    return this.stack[this.stack.length - 1];
  }

  isEmpty(): boolean {
    return this.stack.length === 0;
  }

  size(): number {
    return this.stack.length;
  }

  getStack(): Book[] {
    return this.stack;
  }
}