interface TrieNode<T> {
  children: Map<string, TrieNode<T>>;
  values: Set<T>;
}

export class Trie<T> {
  private root: TrieNode<T>;

  constructor() {
    this.root = this.createNode();
  }

  private createNode(): TrieNode<T> {
    return {
      children: new Map(),
      values: new Set()
    };
  }

  private normalize(text: string): string {
    return text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
  }

  insert(word: string, value: T): void {
    const normalized = this.normalize(word);

    if (!normalized) return;

    let current = this.root;

    for (const character of normalized) {
      if (!current.children.has(character)) {
        current.children.set(character, this.createNode());
      }

      current = current.children.get(character)!;
    }

    current.values.add(value);
  }

  search(prefix: string): T[] {
    const normalized = this.normalize(prefix);

    if (!normalized) return [];

    let current = this.root;

    for (const character of normalized) {
      const next = current.children.get(character);

      if (!next) return [];

      current = next;
    }

    return this.collectValues(current);
  }

  private collectValues(node: TrieNode<T>): T[] {
    const results = new Set<T>(node.values);

    for (const child of node.children.values()) {
      for (const value of this.collectValues(child)) {
        results.add(value);
      }
    }

    return Array.from(results);
  }
}