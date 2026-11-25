
import { Song } from '../models/song';

export class MaxHeap {
  private heap: Song[] = [];


  private parent(index: number): number {
    return Math.floor((index - 1) / 2);
  }

  
  private left(index: number): number {
    return 2 * index + 1;
  }

  
  private right(index: number): number {
    return 2 * index + 2;
  }

  
  private swap(i: number, j: number): void {
    [this.heap[i], this.heap[j]] =
      [this.heap[j], this.heap[i]];
  }

  
  insert(song: Song): void {
    this.heap.push(song);
    this.heapifyUp(this.heap.length - 1);
  }


  private heapifyUp(index: number): void {
    while (
      index > 0 &&
      this.heap[index].plays >
      this.heap[this.parent(index)].plays
    ) {
      const parentIndex = this.parent(index);
      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }

  
  peek(): Song | null {
    return this.heap.length > 0 ? this.heap[0] : null;
  }


  extractMax(): Song | null {
    if (this.heap.length === 0) {
      return null;
    }

    if (this.heap.length === 1) {
      return this.heap.pop()!;
    }

    const max = this.heap[0];
    this.heap[0] = this.heap.pop()!;

    this.heapifyDown(0);

    return max;
  }


  private heapifyDown(index: number): void {
    let largest = index;
    const left = this.left(index);
    const right = this.right(index);

    if (
      left < this.heap.length &&
      this.heap[left].plays > this.heap[largest].plays
    ) {
      largest = left;
    }

    if (
      right < this.heap.length &&
      this.heap[right].plays > this.heap[largest].plays
    ) {
      largest = right;
    }

    if (largest !== index) {
      this.swap(index, largest);
      this.heapifyDown(largest);
    }
  }


  getTop(limit: number): Song[] {
    const copy = new MaxHeap();

    this.heap.forEach(song => copy.insert(song));

    const result: Song[] = [];

    while (result.length < limit) {
      const song = copy.extractMax();

      if (!song) break;

      result.push(song);
    }

    return result;
  }

  
  size(): number {
    return this.heap.length;
  }
}
