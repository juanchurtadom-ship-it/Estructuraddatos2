export interface GraphEdge {
  destination: string;
  distance: number;
}

export interface RouteResult {
  path: string[];
  distance: number;
}

export class Graph {
  private adjacencyList = new Map<string, GraphEdge[]>();

  
  addVertex(vertex: string): void {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, []);
    }
  }

  
  addEdge(
    origin: string,
    destination: string,
    distance: number,
    bidirectional = true
  ): void {
    if (!Number.isFinite(distance) || distance < 0) {
      throw new Error('La distancia debe ser un número positivo o cero.');
    }

    this.addVertex(origin);
    this.addVertex(destination);

    this.setEdge(origin, destination, distance);

    if (bidirectional) {
      this.setEdge(destination, origin, distance);
    }
  }

  private setEdge(
    origin: string,
    destination: string,
    distance: number
  ): void {
    const edges = this.adjacencyList.get(origin)!;

    const existing = edges.find(
      edge => edge.destination === destination
    );

    if (existing) {
      existing.distance = distance;
    } else {
      edges.push({ destination, distance });
    }
  }

  // Calcular la ruta más corta mediante Dijkstra
  shortestPath(
    start: string,
    end: string
  ): RouteResult | null {

    if (
      !this.adjacencyList.has(start) ||
      !this.adjacencyList.has(end)
    ) {
      return null;
    }

    const distances = new Map<string, number>();
    const previous = new Map<string, string | null>();

    const unvisited = new Set(this.adjacencyList.keys());

    for (const vertex of unvisited) {
      distances.set(vertex, Infinity);
      previous.set(vertex, null);
    }

    distances.set(start, 0);

    while (unvisited.size > 0) {
      let current: string | null = null;
      let minimumDistance = Infinity;

      for (const vertex of unvisited) {
        const distance = distances.get(vertex) ?? Infinity;

        if (distance < minimumDistance) {
          minimumDistance = distance;
          current = vertex;
        }
      }

      if (current === null || minimumDistance === Infinity) {
        break;
      }

      if (current === end) {
        break;
      }

      unvisited.delete(current);

      const edges = this.adjacencyList.get(current) ?? [];

      for (const edge of edges) {
        if (!unvisited.has(edge.destination)) {
          continue;
        }

        const newDistance =
          minimumDistance + edge.distance;

        if (
          newDistance <
          (distances.get(edge.destination) ?? Infinity)
        ) {
          distances.set(edge.destination, newDistance);
          previous.set(edge.destination, current);
        }
      }
    }

    const totalDistance = distances.get(end) ?? Infinity;

    if (!Number.isFinite(totalDistance)) {
      return null;
    }

    const path: string[] = [];
    let current: string | null = end;

    while (current !== null) {
      path.unshift(current);
      current = previous.get(current) ?? null;
    }

    return {
      path,
      distance: totalDistance
    };
  }

  
  getVertices(): string[] {
    return Array.from(this.adjacencyList.keys());
  }

  
  getNeighbors(vertex: string): GraphEdge[] {
    return [...(this.adjacencyList.get(vertex) ?? [])];
  }

  
  get size(): number {
    return this.adjacencyList.size;
  }
}