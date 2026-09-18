export class DoublyNode<T> {
  data: T;
  next: DoublyNode<T> | null = null;
  previous: DoublyNode<T> | null = null;

  constructor(data: T) {
    this.data = data;
  }
}

export class DoublyLinkedList<T> {
  head: DoublyNode<T> | null = null;
  tail: DoublyNode<T> | null = null;
  current: DoublyNode<T> | null = null;

  append(data: T): void {
    const newNode = new DoublyNode(data);

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
      this.current = newNode;
      return;
    }

    newNode.previous = this.tail;
    this.tail!.next = newNode;
    this.tail = newNode;
  }

  moveNext(): T | null {
    if (this.current?.next) {
      this.current = this.current.next;
      return this.current.data;
    }

    return null;
  }

  movePrevious(): T | null {
    if (this.current?.previous) {
      this.current = this.current.previous;
      return this.current.data;
    }

    return null;
  }

  getCurrent(): T | null {
    return this.current?.data ?? null;
  }

  toArray(): T[] {
    const result: T[] = [];
    let node = this.head;

    while (node !== null) {
      result.push(node.data);
      node = node.next;
    }

    return result;
  }
}