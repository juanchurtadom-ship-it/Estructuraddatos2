import { Node } from './node';

export class ListaCircularDoble<T> {
  head: Node<T> | null;
  tail: Node<T> | null;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(value: T): void {
    const newNode = new Node(value);

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;

      newNode.next = newNode;
      newNode.previous = newNode;
    } else {
      newNode.previous = this.tail;
      newNode.next = this.head;

      this.tail!.next = newNode;
      this.head!.previous = newNode;

      this.tail = newNode;
    }

    this.length++;
  }

  next(): T | null {
    if (this.head === null) return null;

    this.head = this.head.next;

    return this.head!.value;
  }

  previous(): T | null {
    if (this.head === null) return null;

    this.head = this.head.previous;

    return this.head!.value;
  }

  peek(): T | null {
    if (this.head === null) return null;

    return this.head.value;
  }

  size(): number {
    return this.length;
  }

  print(): T[] {
    const values: T[] = [];

    if (this.head === null) return values;

    let current = this.head;

    do {
      values.push(current.value);
      current = current.next!;
    } while (current !== this.head);

    return values;
  }
}