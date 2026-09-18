export class Node<T> {
  data: T;
  next: Node<T> | null = null;

  constructor(data: T) {
    this.data = data;
  }
}

export class LinkedList<T> {
  head: Node<T> | null = null;
  tail: Node<T> | null = null;

  append(data: T): void {
    const newNode = new Node(data);

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
      return;
    }

    this.tail!.next = newNode;
    this.tail = newNode;
  }

  get(index: number): T | null {
    let current = this.head;
    let position = 0;

    while (current !== null) {
      if (position === index) {
        return current.data;
      }

      current = current.next;
      position++;
    }

    return null;
  }

  toArray(): T[] {
    const result: T[] = [];
    let current = this.head;

    while (current !== null) {
      result.push(current.data);
      current = current.next;
    }

    return result;
  }
}