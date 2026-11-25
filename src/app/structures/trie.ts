
class TrieNode {
  children: Map<string, TrieNode> = new Map();
  isEndOfWord: boolean = false;
  songTitle: string = '';
}

export class Trie {
  private root: TrieNode = new TrieNode();

  // Insertar una canción
  insert(title: string): void {
    let current = this.root;

    for (const char of title.toLowerCase()) {
      if (!current.children.has(char)) {
        current.children.set(char, new TrieNode());
      }

      current = current.children.get(char)!;
    }

    current.isEndOfWord = true;
    current.songTitle = title;
  }

  // Buscar una canción exacta
  search(title: string): boolean {
    let current = this.root;

    for (const char of title.toLowerCase()) {
      const node = current.children.get(char);

      if (!node) {
        return false;
      }

      current = node;
    }

    return current.isEndOfWord;
  }

  suggestions(prefix: string): string[] {
    let current = this.root;

    for (const char of prefix.toLowerCase()) {
      const node = current.children.get(char);

      if (!node) {
        return [];
      }

      current = node;
    }

    const results: string[] = [];

    this.collectSongs(current, results);

    return results;
  }

  
  private collectSongs(
    node: TrieNode,
    results: string[]
  ): void {
    if (node.isEndOfWord) {
      results.push(node.songTitle);
    }

    for (const child of node.children.values()) {
      this.collectSongs(child, results);
    }
  }
}
