
import { TrieNode, Product } from './trie-node';

export class Trie {
  root: TrieNode;

  constructor() {
    this.root = new TrieNode(null);
  }

  insert(name: string, popularity: number): void {
    let current = this.root;
    const normalizedName = name.toLowerCase().trim();

    for (const character of normalizedName) {
      if (!current.children.has(character)) {
        current.children.set(character, new TrieNode(character));
      }

      current = current.children.get(character)!;
    }

    current.isEndOfWord = true;
    current.product = {
      name,
      popularity
    };
  }

  search(prefix: string): Product[] {
    let current = this.root;
    const normalizedPrefix = prefix.toLowerCase().trim();

    for (const character of normalizedPrefix) {
      const child = current.children.get(character);

      if (!child) {
        return [];
      }

      current = child;
    }

    return this.collectProducts(current);
  }

  private collectProducts(node: TrieNode): Product[] {
    const products: Product[] = [];

    if (node.isEndOfWord && node.product) {
      products.push(node.product);
    }

    for (const child of node.children.values()) {
      products.push(...this.collectProducts(child));
    }

    return products;
  }
}
