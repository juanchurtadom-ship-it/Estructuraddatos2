
export interface Product {
  name: string;
  popularity: number;
}

export class TrieNode {
  value: string | null;
  isEndOfWord: boolean;
  children: Map<string, TrieNode>;
  product: Product | null;

  constructor(value: string | null = null) {
    this.value = value;
    this.isEndOfWord = false;
    this.children = new Map<string, TrieNode>();
    this.product = null;
  }
}
