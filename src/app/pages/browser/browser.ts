import { Component } from '@angular/core';
import { DoublyLinkedList } from '../../structures/doubly-linked-list';
import { BrowserPage } from '../../models/browser-page';

@Component({
  selector: 'app-browser',
  standalone: true,
  imports: [],
  templateUrl: './browser.html',
  styleUrl: './browser.css'
})
export class Browser {

  history = new DoublyLinkedList<BrowserPage>();

  currentPage: BrowserPage | null = null;

  constructor() {
    this.loadHistory();
    this.currentPage = this.history.getCurrent();
  }

  loadHistory(): void {

    this.history.append({
      title: 'Google',
      url: 'www.google.com'
    });

    this.history.append({
      title: 'YouTube',
      url: 'www.youtube.com'
    });

    this.history.append({
      title: 'GitHub',
      url: 'www.github.com'
    });

    this.history.append({
      title: 'Angular',
      url: 'angular.dev'
    });

    this.history.append({
      title: 'Wikipedia',
      url: 'www.wikipedia.org'
    });

  }

  goBack(): void {
    const page = this.history.movePrevious();

    if (page) {
      this.currentPage = page;
    }
  }

  goForward(): void {
    const page = this.history.moveNext();

    if (page) {
      this.currentPage = page;
    }
  }

  get historyList(): BrowserPage[] {
    return this.history.toArray();
  }

  getCurrentIndex(): number {
    const current = this.history.getCurrent();

    if (!current) {
      return -1;
    }

    return this.historyList.indexOf(current);
  }
}