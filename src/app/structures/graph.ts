
export class SongGraph {
  private adjacencyList: Map<string, Set<string>> = new Map();

  addSong(song: string): void {
    if (!this.adjacencyList.has(song)) {
      this.adjacencyList.set(song, new Set());
    }
  }

  addConnection(song1: string, song2: string): void {
    this.addSong(song1);
    this.addSong(song2);

    this.adjacencyList.get(song1)!.add(song2);
    this.adjacencyList.get(song2)!.add(song1);
  }

  getRecommendations(song: string): string[] {
    if (!this.adjacencyList.has(song)) {
      return [];
    }

    return Array.from(this.adjacencyList.get(song)!);
  }

  getGraph(): Map<string, Set<string>> {
    return this.adjacencyList;
  }

  removeSong(song: string): void {
    if (!this.adjacencyList.has(song)) {
      return;
    }

    for (const connections of this.adjacencyList.values()) {
      connections.delete(song);
    }

    this.adjacencyList.delete(song);
  }
}
