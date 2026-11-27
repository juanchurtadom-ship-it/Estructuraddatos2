
class Node<T> {
  value: T;
  next: Node<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

export class LinkedList<T> {
  private head: Node<T> | null = null;
  private length = 0;

  append(value: T): void {
    const newNode = new Node(value);

    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;

      while (current.next) {
        current = current.next;
      }

      current.next = newNode;
    }

    this.length++;
  }


  remove(predicate: (value: T) => boolean): boolean {
    if (!this.head) return false;

    if (predicate(this.head.value)) {
      this.head = this.head.next;
      this.length--;
      return true;
    }

    let current = this.head;

    while (current.next) {
      if (predicate(current.next.value)) {
        current.next = current.next.next;
        this.length--;
        return true;
      }

      current = current.next;
    }

    return false;
  }

  toArray(): T[] {
    const result: T[] = [];
    let current = this.head;

    while (current) {
      result.push(current.value);
      current = current.next;
    }

    return result;
  }

  
  get size(): number {
    return this.length;
  }

  
  clear(): void {
    this.head = null;
    this.length = 0;
  }
}