import { Component } from '@angular/core';
import { LinkedList } from '../../structures/linked-lists';
import { Song } from '../../models/song';

@Component({
  selector: 'app-songs',
  standalone: true,
  imports: [],
  templateUrl: './songs.html',
  styleUrl: './songs.css'
})
export class Songs {
  songs = new LinkedList<Song>();

  currentSong: Song | null = null;
  currentIndex = 0;
  get songList(): Song[] {
  return this.songs.toArray();
}

  constructor() {
    this.loadSongs();
    this.currentSong = this.songs.get(0);
  }

  loadSongs(): void {
    this.songs.append({
      title: '666',
      artist: 'Yan Block',
      duration: '2:20'
    });

    this.songs.append({
      title: 'LOVE',
      artist: 'Clarent',
      duration: '2:53'
    });

    this.songs.append({
      title: '1060',
      artist: 'Benaf',
      duration: '4:14'
    });

    this.songs.append({
      title: 'Die For You',
      artist: 'The Weeknd',
      duration: '4:20'
    });

    this.songs.append({
      title: 'One More Time',
      artist: 'Daft Punk',
      duration: '5:20'
    });
  }

  nextSong(): void {
    if (this.currentIndex < this.songs.toArray().length - 1) {
      this.currentIndex++;
      this.currentSong = this.songs.get(this.currentIndex);
    }
  }

  previousSong(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.currentSong = this.songs.get(this.currentIndex);
    }
  }
}