
import { Injectable } from '@angular/core';
import { Song } from '../models/song';
import { Trie } from '../structures/trie';
import { MaxHeap } from '../structures/max-heap';
import { SongGraph } from '../structures/graph';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  private trie = new Trie();
  private maxHeap = new MaxHeap();
  private graph = new SongGraph();

  private songs: Song[] = [];

  constructor() {
    this.loadInitialSongs();
  }

  private loadInitialSongs(): void {
    const initialSongs: Song[] = [
      {
        id: 1,
        title: 'Hasta abajo',
        artist: 'Don Omar',
        plays: 9500,
        duration: '3:20'
      },
      {
        id: 2,
        title: 'Sexy movimiento',
        artist: 'Wisin y Yandel',
        plays: 8700,
        duration: '3:50'
      },
      {
        id: 3,
        title: 'Candy',
        artist: 'Plan B',
        plays: 8200,
        duration: '3:35'
      },
      {
        id: 4,
        title: 'La Pregunta',
        artist: 'J Alvarez',
        plays: 7800,
        duration: '3:53'
      },
      {
        id: 5,
        title: 'Pa que la pases bien',
        artist: 'Arcangel',
        plays: 6500,
        duration: '4:23'
      },
      {
        id: 6,
        title: 'Zun Da Da',
        artist: 'Zion',
        plays: 7200,
        duration: '3:23'
      }
    ];

    initialSongs.forEach(song => this.addSong(song));

    this.graph.addConnection('Hasta abajo', 'Sexy movimiento');
    this.graph.addConnection('Hasta abajo', 'Candy');
    this.graph.addConnection('Sexy movimiento', 'Zun Da Da');
    this.graph.addConnection('Candy', 'La Pregunta');
    this.graph.addConnection('La Pregunta', 'Pa que la pases bien');
    this.graph.addConnection('Pa que la pases bien', 'Zun Da Da');
  }

  addSong(song: Song): void {
    if (this.songs.some(s => s.id === song.id)) {
      return;
    }

    this.songs.push(song);
    this.trie.insert(song.title);
    this.maxHeap.insert(song);
    this.graph.addSong(song.title);
  }

  searchSong(title: string): boolean {
    return this.trie.search(title);
  }

  
  getSuggestions(prefix: string): string[] {
    return this.trie.suggestions(prefix);
  }


  getTopSongs(limit: number = 5): Song[] {
    return this.maxHeap.getTop(limit);
  }


  getAllSongs(): Song[] {
    return [...this.songs];
  }


  connectSongs(song1: string, song2: string): void {
    this.graph.addConnection(song1, song2);
  }

  
  getRecommendations(title: string): string[] {
    return this.graph.getRecommendations(title);
  }
}
