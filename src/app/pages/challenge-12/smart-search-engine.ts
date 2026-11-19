
import { Trie } from './trie';
import { MinHeap } from './min-heap';
import { Product } from './trie-node';

export class SmartSearchEngine {
  private trie: Trie;

  constructor() {
    this.trie = new Trie();
  }

  insert(name: string, popularity: number): void {
    if (!name.trim() || !Number.isFinite(popularity)) {
      return;
    }

    this.trie.insert(name, popularity);
  }

  searchTopK(prefix: string, k: number): Product[] {
    if (!prefix.trim() || k <= 0) {
      return [];
    }

    const products = this.trie.search(prefix);
    const minHeap = new MinHeap();

    for (const product of products) {
      minHeap.push(product);

      if (minHeap.size() > k) {
        minHeap.pop();
      }
    }

    const results: Product[] = [];

    while (minHeap.size() > 0) {
      const product = minHeap.pop();

      if (product) {
        results.push(product);
      }
    }

    return results.reverse();
  }
}
