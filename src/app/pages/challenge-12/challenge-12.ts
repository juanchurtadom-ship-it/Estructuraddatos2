import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SmartSearchEngine } from './smart-search-engine';
import { Product } from './trie-node';
import { Component } from '@angular/core';

@Component({
  selector: 'app-challenge-12',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './challenge-12.html',
  styleUrl: './challenge-12.css'
})
export class Challenge12 {
  engine = new SmartSearchEngine();

  prefix = '';
  k = 2;
  results: Product[] = [];

  constructor() {
    this.engine.insert('air max', 90);
    this.engine.insert('air force', 95);
    this.engine.insert('air jordan', 85);
    this.engine.insert('adidas boost', 80);
    this.engine.insert('air zoom', 88);
  }

  search(): void {
    this.results = this.engine.searchTopK(
      this.prefix,
      this.k
    );
  }
}
