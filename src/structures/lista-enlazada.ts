import { Node } from './node';

export class ListaEnlazada<T> {

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

    } else {

      this.tail!.next = newNode;
      this.tail = newNode;

    }

    this.length++;
  }

  peek(): T | null {

    if (this.head === null) {
      return null;
    }

    return this.head.value;
  }

  size(): number {
    return this.length;
  }

  remove(): T | null {

    if (this.head === null) {
      return null;
    }

    const value = this.head.value;

    this.head = this.head.next;

    this.length--;

    if (this.length === 0) {
      this.tail = null;
    }

    return value;
  }

  print(): T[] {

    const values: T[] = [];

    let current = this.head;

    while (current !== null) {

      values.push(current.value);
      current = current.next;

    }

    return values;
  }
}