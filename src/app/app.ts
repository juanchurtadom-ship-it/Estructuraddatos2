
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {

  protected readonly title = signal('FoodFlow');

  
  searchTerm = signal('');


  updateSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value.toLowerCase().trim());
  }

  
  matchesSearch(name: string, description: string): boolean {
    const term = this.searchTerm();

    if (!term) {
      return true;
    }

    return (
      name.toLowerCase().includes(term) ||
      description.toLowerCase().includes(term)
    );
  }

}
