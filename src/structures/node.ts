export class Node<T> {
  value: T;
  next: Node<T> | null;
  previous: Node<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
    this.previous = null;
  }
}