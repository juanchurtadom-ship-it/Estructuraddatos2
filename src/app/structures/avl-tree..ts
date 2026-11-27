class AVLNode<T> {
  value: T;
  left: AVLNode<T> | null = null;
  right: AVLNode<T> | null = null;
  height = 1;

  constructor(value: T) {
    this.value = value;
  }
}

export class AVLTree<T> {
  private root: AVLNode<T> | null = null;
  private count = 0;

  constructor(
    private compare: (a: T, b: T) => number
  ) {}

  private height(node: AVLNode<T> | null): number {
    return node?.height ?? 0;
  }

  private updateHeight(node: AVLNode<T>): void {
    node.height =
      1 + Math.max(
        this.height(node.left),
        this.height(node.right)
      );
  }

  private balanceFactor(node: AVLNode<T>): number {
    return this.height(node.left) -
           this.height(node.right);
  }

  private rotateRight(y: AVLNode<T>): AVLNode<T> {
    const x = y.left!;
    const temp = x.right;

    x.right = y;
    y.left = temp;

    this.updateHeight(y);
    this.updateHeight(x);

    return x;
  }

  private rotateLeft(x: AVLNode<T>): AVLNode<T> {
    const y = x.right!;
    const temp = y.left;

    y.left = x;
    x.right = temp;

    this.updateHeight(x);
    this.updateHeight(y);

    return y;
  }

  private balance(node: AVLNode<T>): AVLNode<T> {
    this.updateHeight(node);

    const factor = this.balanceFactor(node);


    if (factor > 1 && this.balanceFactor(node.left!) >= 0) {
      return this.rotateRight(node);
    }

    
    if (factor > 1 && this.balanceFactor(node.left!) < 0) {
      node.left = this.rotateLeft(node.left!);
      return this.rotateRight(node);
    }

    
    if (factor < -1 && this.balanceFactor(node.right!) <= 0) {
      return this.rotateLeft(node);
    }

    
    if (factor < -1 && this.balanceFactor(node.right!) > 0) {
      node.right = this.rotateRight(node.right!);
      return this.rotateLeft(node);
    }

    return node;
  }

  insert(value: T): void {
    const existed = this.search(value) !== undefined;

    if (existed) return;

    this.root = this.insertNode(this.root, value);
    this.count++;
  }

  private insertNode(
    node: AVLNode<T> | null,
    value: T
  ): AVLNode<T> {
    if (!node) {
      return new AVLNode(value);
    }

    const comparison = this.compare(value, node.value);

    if (comparison < 0) {
      node.left = this.insertNode(node.left, value);
    } else if (comparison > 0) {
      node.right = this.insertNode(node.right, value);
    } else {
      return node;
    }

    return this.balance(node);
  }

  search(value: T): T | undefined {
    let current = this.root;

    while (current) {
      const comparison = this.compare(value, current.value);

      if (comparison === 0) {
        return current.value;
      }

      current = comparison < 0
        ? current.left
        : current.right;
    }

    return undefined;
  }

  inOrder(): T[] {
    const result: T[] = [];

    const traverse = (node: AVLNode<T> | null): void => {
      if (!node) return;

      traverse(node.left);
      result.push(node.value);
      traverse(node.right);
    };

    traverse(this.root);

    return result;
  }

  get size(): number {
    return this.count;
  }

  clear(): void {
    this.root = null;
    this.count = 0;
  }
}