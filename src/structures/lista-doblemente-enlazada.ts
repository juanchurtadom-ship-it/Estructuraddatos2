class DoublyNode<T> {

  value: T;
  next: DoublyNode<T> | null;
  previous: DoublyNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
    this.previous = null;
  }

}

export class ListaDoblementeEnlazada<T> {

  head: DoublyNode<T> | null;
  tail: DoublyNode<T> | null;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(value: T): void {

    const newNode = new DoublyNode(value);

    if (this.head === null) {

      this.head = newNode;
      this.tail = newNode;

    } else {

      newNode.previous = this.tail;
      this.tail!.next = newNode;
      this.tail = newNode;

    }

    this.length++;
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

  size(): number {
    return this.length;
  }
}