
import { Product } from './trie-node';

export class MinHeap {
  heap: Product[];

  constructor() {
    this.heap = [];
  }

  push(product: Product): void {
    this.heap.push(product);
    this.percolateUp();
  }

  pop(): Product | undefined {
    if (this.heap.length === 0) {
      return undefined;
    }

    this.swap(0, this.heap.length - 1);

    const minimum = this.heap.pop();

    if (this.heap.length > 0) {
      this.percolateDown(0);
    }

    return minimum;
  }

  peek(): Product | undefined {
    return this.heap[0];
  }

  private percolateUp(): void {
    let current = this.heap.length - 1;

    while (current > 0) {
      const parent = Math.floor((current - 1) / 2);

      if (
        this.heap[current].popularity <
        this.heap[parent].popularity
      ) {
        this.swap(current, parent);
        current = parent;
      } else {
        break;
      }
    }
  }

  private percolateDown(index: number): void {
    let current = index;

    while (2 * current + 1 < this.heap.length) {
      const left = 2 * current + 1;
      const right = 2 * current + 2;

      let minimum = left;

      if (
        right < this.heap.length &&
        this.heap[right].popularity <
        this.heap[left].popularity
      ) {
        minimum = right;
      }

      if (
        this.heap[minimum].popularity <
        this.heap[current].popularity
      ) {
        this.swap(current, minimum);
        current = minimum;
      } else {
        break;
      }
    }
  }

  private swap(i: number, j: number): void {
    [this.heap[i], this.heap[j]] =
      [this.heap[j], this.heap[i]];
  }

  size(): number {
    return this.heap.length;
  }

  toArray(): Product[] {
    return [...this.heap];
  }
}
