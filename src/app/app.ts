import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StackService } from './services/stack.service';
import { Book } from './models/book';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  books: Book[] = [];

  newBook: Book = {
    name: '',
    isbn: '',
    author: '',
    editorial: ''
  };

  constructor(private stackService: StackService) {
    this.books = this.stackService.getStack();
  }

  addBook(): void {
    if (
      this.newBook.name.trim() &&
      this.newBook.isbn.trim() &&
      this.newBook.author.trim() &&
      this.newBook.editorial.trim()
    ) {
      this.stackService.push({ ...this.newBook });

      this.newBook = {
        name: '',
        isbn: '',
        author: '',
        editorial: ''
      };
    }
  }

}