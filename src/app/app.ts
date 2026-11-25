
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MusicService } from './services/music.service';
import { Song } from './models/song';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  songs: Song[] = [];
  topSongs: Song[] = [];

  searchText: string = '';
  suggestions: string[] = [];

  selectedSong: string = '';
  recommendations: string[] = [];

  constructor(private musicService: MusicService) {}

  ngOnInit(): void {
    this.songs = this.musicService.getAllSongs();
    this.topSongs = this.musicService.getTopSongs(6);
  }

 
  onSearch(): void {
    if (!this.searchText.trim()) {
      this.suggestions = [];
      return;
    }

    this.suggestions =
      this.musicService.getSuggestions(this.searchText);
  }

  
  selectSong(title: string): void {
    this.searchText = title;
    this.suggestions = [];
    this.selectedSong = title;

    this.recommendations =
      this.musicService.getRecommendations(title);
  }

  showRecommendations(title: string): void {
    this.selectedSong = title;

    this.recommendations =
      this.musicService.getRecommendations(title);
  }
}
